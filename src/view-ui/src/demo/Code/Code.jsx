import './Code.scss';

const Code = (props) => {
  return (
    <code className="my_code">
      {props.children}
    </code>
  )
}

export default Code;