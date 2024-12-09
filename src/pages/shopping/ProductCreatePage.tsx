import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useNavigate, useParams } from 'react-router-dom'

import { PostCreateProductType } from '@/apis/shopping/postCreateProduct'
import useBrands from '@/hooks/shopping/useBrands'
import usePostCreateProduct from '@/hooks/shopping/usePostCreateProduct'
import usePostUploadFiles from '@/hooks/upload/useUploadFiles'

const ProductCreatePage = () => {
  const { mutateAsync: create } = usePostCreateProduct()
  const { mutateAsync: upload } = usePostUploadFiles()
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: brands } = useBrands()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const detailFileInputRef = useRef<HTMLInputElement>(null)

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [selectedDetailFiles, setSelectedDetailFiles] = useState<FileList | null>(null)

  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [detailImagePreviews, setDetailImagePreviews] = useState<string[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'normal' | 'detail') => {
    const files = event.target.files
    if (files) {
      const fileURLs = Array.from(files).map((file) => URL.createObjectURL(file))
      if (type === 'normal') {
        setSelectedFiles(files)
        setImagePreviews(fileURLs)
      } else {
        setSelectedDetailFiles(files)
        setDetailImagePreviews(fileURLs)
      }
    }
  }

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url))
      detailImagePreviews.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [imagePreviews, detailImagePreviews])

  const reorder = (list: string[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  // 드래그 후 순서 변경 핸들러
  const onDragEnd = (result: any, type: 'normal' | 'detail') => {
    if (!result.destination) {
      return
    }
    if (type === 'normal') {
      const reorderedImages = reorder(imagePreviews, result.source.index, result.destination.index)
      setImagePreviews(reorderedImages)
    } else {
      const reorderedDetailImages = reorder(detailImagePreviews, result.source.index, result.destination.index)
      setDetailImagePreviews(reorderedDetailImages)
    }
  }

  // 이미지 업로드 함수
  const uploadImages = async (files: FileList | null): Promise<number[] | undefined> => {
    if (files) {
      try {
        const filesArray = Array.from(files)
        const data = await upload(filesArray)
        alert('이미지 업로드 완료')
        return data.images.map((image: { id: number }) => image.id)
      } catch (error) {
        alert('이미지 업로드 중 에러가 발생했습니다.')
      }
    }
    return undefined
  }

  // 상품 정보 상태 관리
  const [productData, setProductData] = useState<PostCreateProductType>({
    userId: 1,
    shopId: Number(id),
    brandId: 0,
    name: '',
    price: 0,
    summary: '',
    description: '',
    imageIds: [],
    detailImageIds: []
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProductData({ ...productData, [name]: value })
  }

  // 상품 생성 처리
  const handleCreate = async () => {
    try {
      // 이미지 업로드 및 ID 설정을 한번에 처리
      const [imageIds, detailImageIds] = await Promise.all([
        uploadImages(selectedFiles),
        uploadImages(selectedDetailFiles)
      ])

      if (!imageIds || !detailImageIds) {
        throw new Error('이미지 업로드에 실패했습니다.')
      }

      // 상품 생성 API 호출
      await create({
        ...productData,
        imageIds,
        detailImageIds
      })

      alert('상품이 성공적으로 생성되었습니다.')
      navigate(-1)

    } catch (error) {
      console.error('Error creating product:', error)
      alert('상품 생성 중 에러가 발생했습니다.')
    }
  }

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <Typography variant="h4">Create Product</Typography>

      <TextField
        label="User ID"
        type="number"
        name="userId"
        value={productData.userId}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Shop ID"
        type="number"
        name="shopId"
        value={productData.shopId}
        onChange={handleChange}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>브랜드</InputLabel>
        <Select
          value={productData.brandId.toString()}
          label="브랜드"
          name="brandId"
          onChange={(e: SelectChangeEvent) => setProductData({ ...productData, brandId: Number(e.target.value) })}
        >
          {brands?.map((brand) => (
            <MenuItem
              key={brand.id}
              value={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Product Name"
        name="name"
        value={productData.name}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Price"
        type="number"
        name="price"
        value={productData.price}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Summary"
        name="summary"
        value={productData.summary}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Description"
        name="description"
        value={productData.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
      />

      {/* 일반 이미지 파일 업로드 */}
      <Typography variant="h6">일반 이미지 업로드</Typography>
      <input
        id="imageInput"
        type="file"
        onChange={(e) => handleFileChange(e, 'normal')}
        multiple
        ref={fileInputRef}
      />

      <DragDropContext onDragEnd={(result) => onDragEnd(result, 'normal')}>
        <Droppable
          droppableId="normalImages"
          direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: 'flex', gap: '10px', overflow: 'auto' }}
            >
              {imagePreviews.map((src, index) => (
                <Draggable
                  key={src}
                  draggableId={src}
                  index={index}>
                  {(provided) => (
                    <img
                      src={src}
                      alt={`preview-${index}`}
                      width="100px"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* 세부 이미지 파일 업로드 */}
      <Typography variant="h6">세부 이미지 업로드</Typography>
      <input
        id="detailImageInput"
        type="file"
        onChange={(e) => handleFileChange(e, 'detail')}
        multiple
        ref={detailFileInputRef}
      />

      <DragDropContext onDragEnd={(result) => onDragEnd(result, 'detail')}>
        <Droppable
          droppableId="detailImages"
          direction="vertical">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto' }}
            >
              {detailImagePreviews.map((src, index) => (
                <Draggable
                  key={src}
                  draggableId={src}
                  index={index}>
                  {(provided) => (
                    <img
                      src={src}
                      alt={`detail-preview-${index}`}
                      width="100px"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreate}
      >
        Create Product
      </Button>
    </Box>
  )
}

export default ProductCreatePage
