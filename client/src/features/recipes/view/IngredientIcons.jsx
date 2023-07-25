// Import SVGs
import { ReactComponent as Fruit } from '../../../assets/ingredients/fa-apple-whole-solid.svg'
import { ReactComponent as Vegetable } from '../../../assets/ingredients/fa-carrot-solid.svg'
import { ReactComponent as Meat } from '../../../assets/ingredients/fa-drumstick-bite-solid.svg'
import { ReactComponent as Egg } from '../../../assets/ingredients/fa-egg-solid.svg'
import { ReactComponent as Sugar } from '../../../assets/ingredients/fa-candy-cane-solid.svg'
import { ReactComponent as Fish } from '../../../assets/ingredients/fa-fish-fins-solid.svg'
import { ReactComponent as Grain } from '../../../assets/ingredients/fa-wheat-awn-solid.svg'
import { ReactComponent as Bread } from '../../../assets/ingredients/fa-bread-slice-solid.svg'
import { ReactComponent as Hot } from '../../../assets/ingredients/fa-pepper-hot-solid.svg'
import { ReactComponent as Cheese } from '../../../assets/ingredients/fa-cheese-solid.svg'
import { ReactComponent as Spice } from '../../../assets/ingredients/fa-spice-solid.svg'
import { ReactComponent as Dairy } from '../../../assets/ingredients/fa-cow-solid.svg'
import { ReactComponent as Dot } from '../../../assets/fa-dot.svg'

export const IngredientIcons = ({ ingredients }) => {
    const svgClass = 'svg-20 ingredient-fill'
    const svgEmptyClass = 'svg-empty'
    let types = []

    if (ingredients.length > 0) {
        ingredients.forEach(x => {
            if (!types.includes(x.ingredient.type)) {
                types.push(x.ingredient.type)
            }
        })
    }

    if (types.length < 7) {
        let empty = [...Array(7 - types.length).keys()].map(x => '*')
        types = [...types, ...empty]
    }

    return (
        <div className="ing-icons flex flex-center med-gap">
            {types.map((x, i) => {
                switch(x) {
                    case 'fruit':
                        return <Fruit className={svgClass} key={x} />
                    case 'vegetable':
                        return <Vegetable className={svgClass} key={x} />
                    case 'meat':
                        return <Meat className={svgClass} key={x} />
                    case 'fish':
                        return <Fish className={svgClass} key={x} />
                    case 'sugar':
                        return <Sugar className={svgClass} key={x} />
                    case 'egg':
                        return <Egg className={svgClass} key={x} />
                    case 'bread':
                        return <Bread className={svgClass} key={x} />
                    case 'grain':
                        return <Grain className={svgClass} key={x} />
                    case 'hot':
                        return <Hot className={svgClass} key={x} />
                    case 'cheese':
                        return <Cheese className={svgClass} key={x} />
                    case 'spice':
                        return <Spice className={svgClass} key={x} />
                    case 'dairy':
                        return <Dairy className={svgClass} key={x} />
                    case '*':
                        return <Dot className={svgEmptyClass} key={`${x}${i}`} />
                    default:
                        return ''
                }
            })}
        </div>
    )
}
