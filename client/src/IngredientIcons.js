// Import SVGs
import { ReactComponent as Fruit } from './assets/fa-apple-whole-solid.svg'
import { ReactComponent as Veg } from './assets/fa-seedling-solid.svg'
import { ReactComponent as Meat } from './assets/fa-drumstick-bite-solid.svg'
import { ReactComponent as Egg } from './assets/fa-egg-solid.svg'
import { ReactComponent as Sugar } from './assets/fa-candy-cane-solid.svg'
import { ReactComponent as Fish } from './assets/fa-fish-fins-solid.svg'

export const IngredientIcons = ({ ingredients }) => {
    const svgClass = 'svg-20'
    const types = []

    if (ingredients.length > 0) {
        ingredients.forEach(x => {
            if (!types.includes(x.ingredient.type)) {
                types.push(x.ingredient.type)
            }
        })
    }

    return (
        <div className="ing-icons flex med-gap">
            {types.map(x => {
                switch(x) {
                    case 'fruit':
                        return <Fruit className={svgClass} key={x} />
                    case 'veg':
                        return <Veg className={svgClass} key={x} />
                    case 'meat':
                        return <Meat className={svgClass} key={x} />
                    case 'fish':
                        return <Fish className={svgClass} key={x} />
                    case 'sugar':
                        return <Sugar className={svgClass} key={x} />
                    case 'egg':
                        return <Egg className={svgClass} key={x} />
                    default:
                        return ''
                }
            })}
        </div>
    )
}
