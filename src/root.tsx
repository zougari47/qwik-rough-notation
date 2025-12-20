import { RoughNotation } from '.';

export default () => {
  return (
    <>
      <head>
        <meta charset='utf-8' />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <h1>
          <span>hello from the </span>
          <RoughNotation color='red' type='box' show={true}>
            other
          </RoughNotation>
          <span> side</span>
        </h1>
      </body>
    </>
  );
};
