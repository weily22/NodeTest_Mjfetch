import './Loading.scss';

const Loading = (props = {}) => {
  if (!props.show) return null;
  return (
    <div className="loading">
      { [1,2,3,4,5].map((key) => <span key={key} />) }
    </div>
  )
}

export default Loading;