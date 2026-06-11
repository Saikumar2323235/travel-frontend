import { useEffect, useState } from "react";
import api from "../services/api";
import DestinationCard from "../components/DestinationCard";
import { Link } from "react-router-dom";

function Destinations() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("All");
  const [sort, setSort] = useState("");

  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    getDestinations();
  }, []);

  async function getDestinations() {
    try {
      const response = await api.get("/destinations");
      setDestinations(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteDestination(id) {
    await api.delete(`/destinations/${id}`);

    setDestinations(
      destinations.filter(
        (destination) => destination.id !== id
      )
    );
  }

  const filteredDestinations = destinations.filter(
    (destination) => {
      const searchMatch =
        destination.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const categoryMatch =
        category === "All" ||
        destination.category === category;

      const budgetMatch =
        budget === "All" ||
        destination.budget === budget;

      return (
        searchMatch &&
        categoryMatch &&
        budgetMatch
      );
    }
  );

  let finalDestinations = [...filteredDestinations];

  if (sort === "high") {
    finalDestinations.sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (sort === "low") {
    finalDestinations.sort(
      (a, b) => a.rating - b.rating
    );
  }

  return (
    <div className="destination-page">

      <Link
        to="/add-destination"
        className="add-destination-link"
      >
        + Add Destination
      </Link>

      <div className="Filters">

        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search Destination"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="category-filter"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option>All</option>
          <option>Beach</option>
          <option>Hill Station</option>
          <option>Adventure</option>
        </select>

        <select
          className="budget-filter"
          value={budget}
          onChange={(e) =>
            setBudget(e.target.value)
          }
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          className="sort-filter"
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="">
            Sort By
          </option>

          <option value="high">
            Rating High → Low
          </option>

          <option value="low">
            Rating Low → High
          </option>

        </select>
      </div>

      <h1 className="page-heading">
        Popular Destinations
      </h1>

      <div className="destinations">
        {finalDestinations.map(
          (destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onDelete={deleteDestination}
            />
          )
        )}
      </div>

    </div>
  );
}

export default Destinations;