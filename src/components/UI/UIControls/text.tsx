import { ReactElement } from 'react'
export function Tunnel():ReactElement {
  return <>
    <div className='TopInfo-content'>
      <img src='/images/xiaomi_su7.webp' alt='' style={{ width: '40vmin', marginTop: '5vmin' }}/>
      <div className='text' style={{ marginTop: '2vmin' }}>C级高性能 生态科技轿车</div>
    </div>
  </>
}

export function CarBody(): ReactElement {
  return <>
    <div className='TopInfo-content'>
      <div className='text_2'>「外观设计」</div>
      <div className='text'>优雅与速度感并存经得起时间考验的设计</div>
      <div className='text_1' style={{ marginTop: '1vmin' }}>遵循「符合直觉」的美学设计理念，造就Xiaomi SU7 经典的流畅车身线条。</div>
      <div className='text_1' style={{ marginTop: '1vmin' }}>富有力量的车身线条与自然舒展的车身比例，让优雅与速度相得益彰。</div>
    </div>
  </>
}
export function WindDrag(): ReactElement {
  return <>
    <div className='TopInfo-content' >
      <div className='text'>出色的超低风阻系数</div>
      <div className='text_2' style={{ marginTop: ' 0.5vmin' }}>Cd 0.195</div>
      <div className='text' style={{ fontSize: '1.8vmin' }}>风，就是最好的设计师。</div>
      <div className='text' style={{ fontSize: '1.8vmin' }}>经过 1000 次以上仿真实验和超过 300次油泥模型调整，不断寻找风道、车身曲线的最优解。</div>
      <div className='text' style={{ fontSize: '1.8vmin' }}>最终达成 Cd0.195 超低风阻系数，带来难以想象的低能耗和出色续航表现。</div>
    </div>
  </>
}
export function Radar(): ReactElement {
  return <>
    <div className='TopInfo-content'>
      <div className='text_2'>「智能驾驶」</div>
      <div className='text'>隆重介绍XiaomiPilot更聪明、更安全的智能驾驶系统
      </div>
      <div className='text'>搭载两颗 NVIDIA DRIVE Orin 芯片，综合算力高达 508 TOPS，感知硬件具备罕见的大范围探测能力；</div>
      <div className='text'>在此之上，以领先行业的智能驾驶算法深度赋能小米全栈自研的全场景智能辅助驾驶。</div>
      <div className='addon'>
        <div className='content'>
          <div>激光雷达 <span className='number'>x1</span></div>
        </div>
        <div>
          <div>高清摄像头 <span className='number'>x11</span></div>
        </div>
        <div>
          <div>毫米波雷达 <span className='number'>x3</span></div>
        </div>
        <div>
          <div>超声波雷达 <span className='number'>x12</span></div>
        </div>
      </div>
    </div>
  </>
}
