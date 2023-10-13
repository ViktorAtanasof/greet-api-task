import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter/Filter";
import Sort from "./components/Sort/Sort";
import PersonCard from "./components/PersonCard/PersonCard";

function App() {
  const [famousPeople, setFamousPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("");

  const handleScroll = useCallback(() => {
    if (
      !loading &&
      hasMoreData &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMoreData]);

  useEffect(() => {
    async function fetchApiData() {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/getData?page=${page}`
        );
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.length === 0) {
          setHasMoreData(false);
        } else {
          setFamousPeople((prevPeople) => [...prevPeople, ...data]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    if (hasMoreData) {
      fetchApiData();
    }
  }, [page, hasMoreData]);

  useEffect(() => {
    // Fetch data initially when the component mounts
    if (!hasMoreData) {
      setHasMoreData(true); // Set to true before fetching the first time
    }
  }, [hasMoreData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Dynamically populate unique categories when famousPeople changes
  useEffect(() => {
    const uniqueCategoriesSet = new Set();

    famousPeople.forEach((person) => {
      person.categories.forEach((category) => {
        uniqueCategoriesSet.add(category.slug);
      });
    });
    const uniqueCategories = Array.from(uniqueCategoriesSet);
    setCategories(uniqueCategories);
  }, [famousPeople]);

  // Sorting logic
  let sortedPeople = [...famousPeople];
  if (selectedSortOption === "name") {
    sortedPeople.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedSortOption === "price") {
    sortedPeople.sort((a, b) => a.prices.price - b.prices.price);
  }

  // Filtering logic
  const filteredPeople = selectedCategory
    ? sortedPeople.filter((person) =>
        person.categories.some((category) => category.slug === selectedCategory)
      )
    : sortedPeople;

  return (
    <main>
      <section className="sort-filter-container">
        <Sort
          selectedSortOption={selectedSortOption}
          onSortChange={setSelectedSortOption}
        />
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </section>
      <section>
        <ul className="people-list">
          {filteredPeople?.length > 0 &&
            filteredPeople.map((person) => {
              return <PersonCard key={person.id} person={person} />;
            })}
        </ul>
        {loading && <p className="spinner">Loading...</p>}
        {!hasMoreData && <p>No more data to fetch.</p>}
      </section>
    </main>
  );
}

export default App;
