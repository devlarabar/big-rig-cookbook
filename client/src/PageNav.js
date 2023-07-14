import { useNavigate } from 'react-router-dom';
import { ReactComponent as Back } from './assets/heroicon-back.svg'
import { ReactComponent as Menu } from './assets/heroicon-menu.svg'

const PageNav = () => {
    const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}
  return (
    <div className="pagenav flex flex-between">
        <button type="button" className="btn-back" onClick={goBack}><Back className="svg-30"/></button>
        <input type="search" className="input-search" placeholder="Search Recipes"/>
    </div>
  )
}

export default PageNav