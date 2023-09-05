import { format } from 'date-fns'
import Link from 'next/link'
import SaveButton from '@components/ui/SaveButton'
import IngredientIcons from '@components/recipe/IngredientIcons'


const RecipeCard = ({ user, recipe }) => {
	let clockStyle
	if ((recipe.prepTime + recipe.cookTime) < 30) {
		clockStyle = 'fill-green'
	} else if ((recipe.prepTime + recipe.cookTime) < 60) {
		clockStyle = 'fill-yellow'
	} else {
		clockStyle = 'fill-red'
	}

	return (
		<div className="recipe-card">
			<div className="card-body">
				<Link href={`/recipes/${recipe._id}`}>
					<h3 className="card-title">{recipe.title}</h3>
				</Link>
				<div className="w-full">
					<span className="flex flex-between gap-5 w-full">
						<Link href={`/profile/${recipe.author.username}`}>{recipe.author.username}</Link>
						<time>{format(new Date(recipe.createdAt), 'MMM d, yyyy HH:mm')}</time></span>
				</div>
				<IngredientIcons ingredients={recipe.ingredients} />
				<div className="card-actions justify-between items-center w-full">
					<span className="bold flex gap-2">Time: <span>{recipe.prepTime + recipe.cookTime} min</span></span>
					<SaveButton recipe={recipe} user={user} />
				</div>
			</div>
		</div>
	)
}

export default RecipeCard