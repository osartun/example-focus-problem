import Link from 'next/link';

const activeElementNodeName = () => (
  typeof document !== 'object' ? 'none' : (
    document.activeElement && document.activeElement.nodeName
  )
);

const isBodyActive = () => activeElementNodeName() === 'BODY';
const isAnchorActive = () => activeElementNodeName() === 'A';

const getState = (id) => (
  id === undefined && isBodyActive() ? 0 :
  id === '1' && isAnchorActive() ? 1 :
  id === '1' && isBodyActive() ? 2 :
  -1
);

const isState = id => q => getState(id) === q;

const commands = [
  'Scroll down',
  'Scroll down again',
  ''
];

const explanations = [
  '',
  `By clicking the link the page changed and scrolled up
  which is a visual representation of a page navigation.
  However, the focus remains on the link you just clicked.
  (See 'Currently active element')`,
  `It's different when you click the same link but without
  using next/link. In that case the active element is the body.`
];

export default ({ url: { query: { id } } }) => (
  <div>
    <div>
      <p>Currently active element is: <strong>{activeElementNodeName()}</strong></p>
      <p>{explanations[getState(id)]}</p>
      <p>{commands[getState(id)]}</p>
      {isState(id)(2) ? <a href="/">Restart</a> : null}
    </div>
    <div>
      {isState(id)(0) ? (
        <Link href="/?id=1">
          <a>Click this nextjs link</a>
        </Link>
      ) : isState(id)(1) ? (
        <a href="/?id=1">Click this usual link</a>
      ) : null}
    </div>
    <style jsx global>{`
      html, body, div {
        height: 100%;
        margin: 0;
      }
      body {
        padding: 1em 1em 0;
      }
      a:active {
        color: green;
      }
      p {
        max-width: 500px;
      }
    `}</style>
  </div>
);
