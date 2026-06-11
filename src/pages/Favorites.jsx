import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  removeFavorite
} from "../features/favoriteSlice";

function Favorites() {

  const dispatch = useDispatch();

  const favorites = useSelector(
    state => state.favorites
  );

  return (

    <div className="favorites-container">

      <h1 className="page-title">
        Favorite Destinations
      </h1>

      {
        favorites.length === 0 ? (

          <div className="empty-favorites">

            <h2>
              No Favorite Destinations
            </h2>

            <p>
              Add destinations from the
              Destinations page.
            </p>

          </div>

        ) : (

          <div className="favorites-grid">

            {
              favorites.map(destination => (

                <div
                  key={destination.id}
                  className="favorite-card"
                >

                  <img
                    src={destination.image}
                    alt={destination.name}
                  />

                  <div className="favorite-content">

                    <h2>
                      {destination.name}
                    </h2>

                    <p>
                      🌍 {destination.country}
                    </p>

                    <p>
                      ⭐ {destination.rating}
                    </p>

                    <p>
                      💰 ₹{destination.budget}
                    </p>

                    <button
                      onClick={() =>
                        dispatch(
                          removeFavorite(
                            destination.id
                          )
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))
            }

          </div>

        )
      }

    </div>

  );
}

export default Favorites;