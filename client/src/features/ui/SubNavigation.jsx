import { Link } from 'react-router-dom'
import { ReactComponent as Home } from '../../assets/navigation/heroicon-home.svg'

const SubNavigation = () => {
    return (
        <div className="nav-subnav">
            <Link to="/"><Home className="svg-20" /> </Link><span class="subnav-slash">/</span> Create Recipe
        </div>
    )
}

export default SubNavigation