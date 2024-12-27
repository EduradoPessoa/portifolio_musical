function RatingStars({ rating, onRatingChange, readonly = false }) {
    try {
        return (
            <div data-name="rating-stars" className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        data-name={`star-${star}`}
                        disabled={readonly}
                        onClick={() => onRatingChange && onRatingChange(star)}
                        className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} 
                            ${readonly ? 'cursor-default' : 'cursor-pointer hover:text-yellow-400'}`}
                    >
                        ★
                    </button>
                ))}
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
