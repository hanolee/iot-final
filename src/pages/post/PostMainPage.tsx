import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Grid, Modal, Switch, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PostItemModel } from '@/apis/post/getPosts'
import useDeleteFilteredPost from '@/hooks/post/useDeleteFilteredPost'
import useDeletePost from '@/hooks/post/useDeletePost'
import useFilteredPosts from '@/hooks/post/useFilteredPosts'
import usePostCreateFilteredPost from '@/hooks/post/usePostCreateFilteredPost'
import usePostFilters from '@/hooks/post/usePostFilters'
import usePosts from '@/hooks/post/usePosts'
import timeSince from '@/libs/timeSince'

const PostMainPage = () => {
  const { data: posts, isLoading } = usePosts()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const sortedPosts = posts?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  }
  )
  const filterIndex = posts ? posts[currentPostIndex].id : 0
  const { data: filters } = usePostFilters()
  const { data: filteredPosts, isLoading: isLoadingFiltered } = useFilteredPosts(filterIndex)
  const { mutate: deleteFilteredPost } = useDeleteFilteredPost()
  const { mutate: createFilteredPost } = usePostCreateFilteredPost()

  const handleOpenModal = (index: number) => {
    setCurrentPostIndex(index)
    setIsModalOpen(true)
  }
  const handleCloseModal = () => setIsModalOpen(false)

  const handleNextPost = () => {
    if (sortedPosts) setCurrentPostIndex((prevIndex) => prevIndex === sortedPosts.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handlePrevPost = () => {
    if (sortedPosts) setCurrentPostIndex((prevIndex) => prevIndex === 0 ? sortedPosts.length - 1 : prevIndex - 1
    )
  }
  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom>
        글/포스트 관리
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('filter')}>
        필터
      </Button>
      <Button
        style={{ color: 'white', backgroundColor: '#01c897' }}
        onClick={() => handleOpenModal(0)}>글 - 필터</Button>
      <Typography
        variant="h6"
        gutterBottom
        style={{ marginTop: '20px' }}>
        현재까지 작성된 글
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          spacing={3}>
          {posts?.map((post) => (
            <PostItem
              post={post}
              key={post.id} />
          ))}
        </Grid>
      )}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <h2>찻집 정보</h2>
          {sortedPosts && (
            <div>
              <p><strong>ID:</strong> {sortedPosts[currentPostIndex].id}</p>
              <p><strong>생성일:</strong> {timeSince(sortedPosts[currentPostIndex].createdAt)}</p>
              <p><strong> {sortedPosts[currentPostIndex].title}</strong></p>
              <p>{sortedPosts[currentPostIndex].content}</p>
              <div>
                {filters && filters.map((filter) => {
                  if (!isLoadingFiltered){
                    const exists = filteredPosts?.some((ft) => ft.type === filter.category)
                    console.log('exists', exists)
                    console.log('filteredPosts', filteredPosts)
                    return (
                      <div key={filter.id}>
                        <Switch
                          checked={exists}
                          onClick={
                            async () => {
                              if (exists && filteredPosts) {
                                const filteredTeahouseToDelete = filteredPosts.find((ft) => ft.type === filter.category)
                                if (filteredTeahouseToDelete) deleteFilteredPost({ id: filteredTeahouseToDelete.id })
                              } else {
                                await createFilteredPost({ postId: sortedPosts[currentPostIndex].id, filterId: filter.id })
                              }
                            }
                          }
                        />
                        {filter.title}
                      </div>
                    )
                  }
                })}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Button onClick={handlePrevPost}>이전</Button>
                <Button onClick={handleNextPost}>다음</Button>
              </div>
            </div>
          )}
          <div>
            <Button
              variant="contained"
              onClick={handleCloseModal}>
              닫기
            </Button>
          </div>
        </Box>
      </Modal>
    </Container>
  )
}

export default PostMainPage

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

interface PostItemProps {
  post: PostItemModel;
}

const PostItem = ({ post }: PostItemProps) => {
  const { mutate: deletePost } = useDeletePost()
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      key={post.id}>
      <Card>
        <CardContent>
          <Typography
            variant="h6"
            component="div">
            {post.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
        <Grid
          container
          spacing={1}
          style={{ padding: '8px' }}>
          {post.images.map((image) => (
            <Grid
              item
              xs={4}
              key={image}>
              <CardMedia
                component="img"
                height="140"
                image={image}
                alt="Post Image" />
            </Grid>
          ))}
        </Grid>
        <CardContent>
          <Button
            style={{ color: 'red' }}
            onClick={async () => {
              await deletePost({ id: post.id })
              alert('삭제되었습니다')
            }
            }>삭제</Button>
        </CardContent>
      </Card>
    </Grid>
  )
}
