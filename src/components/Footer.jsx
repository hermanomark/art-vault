
const Footer = () => {
  return (
    <footer className='bg-ivory text-gray-800 py-6 pt-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <p className='font-lora text-sm mb-2'>
            Data provided by the{' '}
            <a
              href='https://www.artic.edu/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gold underline transition-colors'
            >
              Art Institute of Chicago
            </a>
          </p>
          <p className='font-lora text-xs text-gray-800'>
            Powered by the{' '}
            <a
              href='https://api.artic.edu/docs/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gold underline transition-colors'
            >
              Art Institute of Chicago API
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;