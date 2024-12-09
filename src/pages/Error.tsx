
function ErrorPage() {
  return (
    <></>
    // <Layout>
    //   <Header />
    //   <Content>
    //     <PageBlockCenter>
    //       <PageImage
    //         alt=""
    //         src='/images/alert.png'
    //         width={70}
    //         height={70}
    //       />
    //       <H2>서비스 제공 중 문제가 발생했습니다.</H2>
    //     </PageBlockCenter>
    //   </Content>
    //   <CTAButton
    //     onClick={() => {
    //       window.location.replace('/')
    //     }}
    //     disabled={false}
    //     label="메인으로 가기"
    //   />
    // </Layout>
  )
}

export default ErrorPage

export function Error() {
  return (
    <>
      <img
        alt=""
        src='/images/alert.png'
        width={70}
        height={70}
      />
      <h2>서비스 제공 중 문제가 발생했습니다.</h2>
    </>
  )
}

