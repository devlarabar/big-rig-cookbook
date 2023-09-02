import Image from 'next/image'

const IngredientIcons = ({ ingredients }) => {
    const svgClass = 'ing-svg'
    const svgEmptyClass = 'svg-empty'
    const size = 20
    const dotSize = 7
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
        <div className="py-1 flex flex-center flex-between gap-5">
            {types.map((x, i) => {
                switch (x) {
                    case 'fruit':
                        return <Image 
                            alt="Fruit"
                            src={'/assets/ingredients/fa-apple-whole-solid.svg'} 
                            className={svgClass} 
                            key={x} 
                            width={size}
                            height={size}
                        />
                    case 'vegetable':
                        return <Image 
                            alt="Vegetable"
                            src={'/assets/ingredients/fa-carrot-solid.svg'} 
                            className={svgClass} 
                            key={x} 
                            width={size}
                            height={size}
                        />
                    case 'meat':
                        return <Image 
                            alt="Meat"
                            src={'/assets/ingredients/fa-drumstick-bite-solid.svg'} 
                            className={svgClass} 
                            key={x} 
                            width={size}
                            height={size}
                        />
                    case 'fish':
                        return <Image 
                            alt="Fish"
                            src={'/assets/ingredients/fa-fish-fins-solid.svg'} 
                            className={svgClass} 
                            key={x} 
                            width={size}
                            height={size}
                        />
                    case 'sugar':
                        return <Image 
                            alt="Sugar"
                            src={'/assets/ingredients/fa-candy-cane-solid.svg'} 
                            className={svgClass} 
                            key={x} 
                            width={size}
                            height={size}
                        />
                    case 'egg':
                        return <Image 
                            alt="Egg"
                            src={'/assets/ingredients/fa-egg-solid.svg'} 
                            className={svgClass} 
                            key={x} 
                            width={size}
                            height={size}
                        />
                    case 'bread':
                        return <Image 
                            alt="Bread"
                            src={'/assets/ingredients/fa-bread-slice-solid.svg'} 
                            className={svgClass} 
                            key={x} 
                            width={size}
                            height={size}
                        />
                    case 'grain':
                        return <Image 
                            alt="Grain"
                            src={'/assets/ingredients/fa-wheat-awn-solid.svg'} 
                            className={svgClass} 
                            key={x} 
                            width={size}
                            height={size}
                        />
                    case 'hot':
                        return <Image 
                            alt="Hot"
                            src={'/assets/ingredients/fa-pepper-hot-solid.svg'} 
                            className={svgClass} 
                            key={x} 
                            width={size}
                            height={size}
                        />
                    case 'cheese':
                        return <Image 
                            alt="Cheese"
                            src={'/assets/ingredients/fa-cheese-solid.svg'} 
                            className={svgClass} 
                            key={x} 
                            width={size}
                            height={size}
                        />
                    case 'spice':
                        return <Image 
                            alt="Spice"
                            src={'/assets/ingredients/fa-spice-solid.svg'} 
                            className={svgClass} 
                            key={x} 
                            width={size}
                            height={size}
                        />
                    case 'dairy':
                        return <Image 
                            alt="Dairy"
                            src={'/assets/ingredients/fa-cow-solid.svg'} 
                            className={svgClass} 
                            key={x} 
                            width={size}
                            height={size}
                        />
                    case '*':
                        return <Image 
                            alt="(None)"
                            src={'/assets/ingredients/fa-dot.svg'} 
                            className={svgEmptyClass} 
                            key={`${x}${i}`} 
                            width={dotSize}
                            height={dotSize}
                        />
                    default:
                        return ''
                }
            })}
        </div>
    )
}

export default IngredientIcons