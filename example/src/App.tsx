import TypingText from '@jralphm_dev/react-typing-text';

function App() {
  const demoText = [
    'Smooth typing animation for React applications.',
    'Lightweight and easy to integrate.',
    'Customizable typing speed and pause settings.',
    'Enhances user interfaces with dynamic text.',
  ];

  const demoText2 = ['Gaming', 'Watching Anime', 'Reading Manhwa', 'Reading Manga', 'Coding'];

  return (
    <div className='flex items-center justify-center h-screen text-center'>
      <div className='flex flex-col gap-16'>
        <span className='text-2xl font-medium'>
          Hi, I'm JRMDev. I like{' '}
          <TypingText
            words={demoText2}
            typeSpeed={50}
            deleteSpeed={50}
            pauseDelay={4000}
            showCursor={false}
            className='font-black text-violet-500'
          />
        </span>

        <div>
          <p className='font-light tracking-wider'>( Example 1: with cursor )</p>

          <div className='h-16 pt-2'>
            <TypingText
              words={demoText}
              typeSpeed={30}
              deleteSpeed={30}
              pauseDelay={3000}
              showCursor={true}
              className='text-2xl font-semibold'
            />
          </div>
        </div>

        <div>
          <p className='font-light tracking-wider'>( Example 2: without cursor )</p>
          <div className='h-16 pt-2'>
            <TypingText
              words={demoText}
              typeSpeed={30}
              deleteSpeed={30}
              pauseDelay={3000}
              showCursor={false}
              className='text-2xl font-semibold'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
