import { ReactComponent as Back } from './assets/heroicon-back.svg'

const PageNav = () => {
  return (
    <div className="pagenav flex flex-between">
        <button type="button" className="btn-back"><Back className="svg-30"/></button>
    </div>
  )
}

export default PageNav