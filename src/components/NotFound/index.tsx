import './NotFoundPage.css' // 引入CSS样式

const NotFoundPage = () => {
  return (
    <div className='not-found-container'>
      <h1 className='not-found-title'>404</h1>
      <p className='not-found-message'>页面未找到</p>
      <div className='not-found-animation'>
        {/* 这里可以放置你的动画元素 */}
        <div className='animation-element'>🚀</div>
      </div>
    </div>
  )
}

export default NotFoundPage
