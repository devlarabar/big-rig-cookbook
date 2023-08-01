const IngQtyErr = ({ error }) => {
    return (
        <div>
            {error === 'qty' && <span>Please select an ingredient and a quantity.</span>}
            {error === 'duplicate' && <span>This ingredient already exists.</span>}
        </div>
    )
}

export default IngQtyErr