import { Box, Image, Pagination, Text } from "@mantine/core";
import classes from "./FavoritesStyle.module.css";
import { parseAsInteger, useQueryState } from "nuqs";
import AddToFavorites from "../../components/addToFavorites/AddToFavorites";
import { Link } from "react-router-dom";
import AddToCart from "../../components/addToCart/AddToCart";
import API_CONFIG from "../../core/utils/apiConfig";
import { useEffect, useState } from "react";
import Search from "../home/components/search/Search";
import Empty from "./empty/Empty";
import Loading from "../../components/loading/Loading";

const endpointForUsers = API_CONFIG.endpoints.users.allUsers;

export default function Favorites() {
  const getUser = JSON.parse(localStorage.getItem("currentUser"));

  const [allFavorites, setAllFavorites] = useState([]);
  const [handleFavoriteFetch, setHandleFavoriteFetch] = useState(0);

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const [searchValue, setSearchValue] = useState("");

  // 🔥 Loading لأول مرة فقط
  const [loading, setLoading] = useState(true);

  const limit = 10;

  // ================= FETCH ONLY ONCE =================
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(
          API_CONFIG.mainUrl + endpointForUsers + getUser,
        );

        const data = await res.json();

        setAllFavorites(data?.favorites || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [handleFavoriteFetch]);

  // ================= SEARCH (NO LOADING) =================
  const filteredFavorites = searchValue
    ? allFavorites.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : allFavorites;

  // ================= PAGINATION =================
  const start = (page - 1) * limit;
  const end = page * limit;

  const paginatedFavorites = filteredFavorites.slice(start, end);

  // ================= LOADING ONLY FIRST TIME =================
  if (loading) {
    return<Box display={"grid"} style={{alignContent: "center"}} h={"60vh"}><Loading /></Box>;
  }

  return (
    <Box className={classes.favorites}>
      {/* SEARCH */}
      {allFavorites.length > 0 && <Search setSearchValue={setSearchValue} />}

      {/* CARDS */}
      <Box
        mb={allFavorites.length === 0 ? 0 : 130}
        className={classes.containerCards}
      >
        {/* EMPTY */}
        {allFavorites.length === 0 ? (
          <Empty />
        ) : filteredFavorites.length === 0 ? (
          <Box mt={30}>
            <Text c="red" fw={700} fz={27}>
              Not Found
            </Text>
          </Box>
        ) : (
          paginatedFavorites.map((product) => (
            <Box key={product.id} className={classes.parentCard}>
              <Box className={classes.card}>
                <Image className={classes.imageCard} src={product.image} />

                <AddToFavorites
                  setHandleFavorite={setHandleFavoriteFetch}
                  id={product.id}
                />
              </Box>

              <Box className={classes.details}>
                <Text className={classes.categoryText}>{product.category}</Text>

                <Link to={`/products/${product.id}`} className={classes.text}>
                  {product.name}
                </Link>

                <Text fw={700} c="red" className={classes.price}>
                  {product.price}$
                </Text>

                <Box className={classes.addToCart}>
                  <AddToCart id={product.id} />
                </Box>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* PAGINATION */}
      <Box mb={50} style={{ display: "flex", justifyContent: "center" }}>
        {filteredFavorites.length > limit && (
          <Pagination
            total={Math.ceil(filteredFavorites.length / limit)}
            value={page}
            onChange={setPage}
            color="black"
            size="lg"
          />
        )}
      </Box>
    </Box>
  );
}
