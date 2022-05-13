import './Spinner.css';

export default function Spinner({
  id = '',
  className = '',
  color1 = 'green',
  color2 = 'lightGreen',
  text = 'Loading...',
  textColor = '',
  // noGradientText = false,
}) {
  let style = `.spinnerText {
    background: linear-gradient(90deg, ${color1}, ${color2});
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
  }`;

  if (textColor !== '') {
    style = `
      .spinnerText {
      font-weight: bold;
      color: ${textColor}
      }`;
  }

  return (
    <div id={id} className='spinnerWrapper'>
      <div className='spinner'>
        <svg className='viewBox' viewBox='0 0 50 50'>
          <circle
            className='circle'
            cx='25'
            cy='25'
            r='22.5'
            fill='none'
            strokeWidth='5'
            stroke='url(#myGradient)'
          ></circle>
          <defs>
            <linearGradient id='myGradient'>
              <stop offset='0%' stopColor={color1} />
              <stop offset='100%' stopColor={color2} />
            </linearGradient>
          </defs>
        </svg>
        <div className={`gradientText spinnerText`}>{text}</div>
      </div>
      <style>{style}</style>
    </div>
  );
}
