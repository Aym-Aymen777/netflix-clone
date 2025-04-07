import React from 'react'
import Navbar from '../../components/Navbar'

const HomeScreen = () => {
  return (
    <div className='min-h-[100%] min-w-[100%] bg-black flex flex-col items-center justify-center  '>
      <Navbar/>
      <main className='hero-bg h-screen flex flex-col items-center justify-center w-full '>
        <h1 className='text-4xl md:text-5xl font-bold text-white text-center'>Unlimited movies,Tv Shows and more</h1>
        <p className='mt-4 text-lg text-gray-200 text-center'>watch anywhere, Cancel anytime,</p>
        <p className='mt-4 text-lg text-gray-200 text-center'>Ready to watch? Enter email to create or restart your membership</p>
        <form className='flex  items-center mt-4 w-full max-w-md'>
        <input type="email" name="email" id="email" placeholder='Enter your email' className=' h-[40px] rounded-md  border-none w-[75%]  bg-white pl-2'/>
        <button className='bg-red-600 hover:bg-red-500 ml-1 h-[40px] text-white rounded pr-2 pl-2'>Get Started</button>
        </form>
      </main>
      {/* 1st section */}
			<section className='py-10 bg-black text-white'>
				<div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
					{/* left side */}
					<div className='flex-1 text-center md:text-left'>
						<h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Enjoy on your TV</h2>
						<p className='text-lg md:text-xl'>
							Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
						</p>
					</div>
					{/* right side */}
					<div className='flex-1 relative'>
						<img src='/tv.png' alt='Tv image' className='mt-4 z-20 relative' />
						<video
							className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10'
							playsInline
							autoPlay={true}
							muted
							loop
						>
							<source src='/hero-vid.m4v' type='video/mp4' />
						</video>
					</div>
				</div>
			</section>
      {/* 2nd section */}
      <section className='py-10 bg-black text-white'>
        <div className='flex flex-col-reverse max-w-6xl mx-auto items-center justify-center md:flex-row  px-4 md:px-2'>
          {/* left side */}
          <div className='flex-1 relative'>
            <img src='/section2.png' alt='Mobile image' className='mt-4 z-20 relative' />
            <div className='target  absolute text-white top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2  z-30 w-[80%] h-[30%] bg-black border rounded-md flex items-center'>
            <img src="/stranger-things-sm.png" alt="" className='h-full w-[25%] ' />
           <div className='flex flex-col items-center justify-center ml-4'>
            <p >Strainger Things</p>
            <p className='text-gray-400'>Downloading.....</p>
           </div>
            <img src="download-icon.gif" alt="" className='ml-10'/>
            </div>
          </div>
          {/* right side */}
          <div className='flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-gray-100'>Download your shows to watch offline</h2>
            <p className='text-lg md:text-xl text-gray-200'>
              Save your favorites easily and always have something to watch.
            </p>
          </div>
          </div>
      </section>

      {/* 3rd section */}
      <section className='py-10 bg-black text-white mt-10'>
        <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
          {/* left side */}
          <div className='flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Watch everywhere</h2>
            <p className='text-lg md:text-xl'>
              Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
            </p>
          </div>
          {/* right side */}
          <div className='flex-1 relative'>
            <img src='/device-pile.png' alt='devices' className='mt-4 z-20 relative' />
            <video
              className='absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10 w-[60%]'
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src='/video-devices.m4v' type='video/mp4' />
            </video>
          </div>
        </div>
      </section>

      {/* 4th section */}
      <section className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
          {/* left side */}
          <div className='flex-1 relative'>
            <img src='/kids.png' alt='Kids' className='mt-4 z-20 relative' />
          </div>
          {/* right side */}
          <div className='flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Create profiles for kids</h2>
            <p className='text-lg md:text-xl'>
              Send kids on adventures with their favorite characters in a space made just for them—free with your membership.
            </p>
          </div>
        </div>
      </section>



    </div>
  )
}

export default HomeScreen
