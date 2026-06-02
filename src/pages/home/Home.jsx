import { useEffect, useState } from "react";
import classes from "./HomeStyle.module.css";
import { Box, Divider, Pagination, Text, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import HeaderHome from "./components/header/HeaderHome";
import Filter from "./components/filter/Filter";
import Search from "./components/search/Search";
import API_CONFIG from "../../core/utils/apiConfig";
import { useQueryState, parseAsInteger } from "nuqs";
import AddToFavorites from "../../components/addToFavorites/AddToFavorites";
import AddToCart from "../../components/addToCart/AddToCart";
import Loading from "../../components/loading/Loading";
import Companies from "../../components/section-Companies/Companies";
// import Companies from "./components/section-Companies/Companies";

const endpointForProducts = API_CONFIG.endpoints.products.allProducts;
export default function Home() {
  const [products, setProducts] = useState([]);
  const [limitProducts, setLimitProducts] = useState([]);

  // to get page number from url and set it in page state and if there is no page number in url set it to 1
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const limitInUlr = `?_page=${page}&_per_page=10`;

  const [searchValue, setSearchValue] = useState("");
  // to check if user search with search or filter to fetch data with search or filter
  const [isValue, setIsValue] = useState(false);
  const [isValueSearch, setIsValueSearch] = useState(false);

  const [filterQuery, setFilterQuery] = useState("");

  //  to fetch data with search or without search
  useEffect(() => {
    let query = "";
    let secondQuery = "";
    // got check isValue =false and isValueSearch = false to fetch all data without search and filter
    if (searchValue && isValue == isValueSearch) {
      query = `&name:contains=${searchValue}`;
      secondQuery = `?name:contains=${searchValue}`;
    } else if (filterQuery) {
      query = `&${filterQuery}`;
      secondQuery = `?${filterQuery}`;
    }
    fetch(API_CONFIG.mainUrl + endpointForProducts + limitInUlr + query)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
      });
    // to get total products for pagination
    fetch(API_CONFIG.mainUrl + endpointForProducts + secondQuery)
      .then((res) => res.json())
      .then((data) => {
        setLimitProducts(data);
        // addToCart()
      });
  }, [searchValue, filterQuery, isValue, page]);

  // to check if the screen is mobile or not for change the aspect ratio of the video review

   const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 577);
    };

    handleResize(); // أول مرة
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box>
      <Box className={classes.content}>
        {/* ==== header === */}
        <HeaderHome />
        <Box mt={25} className={classes.companies}>
          {/* === companies === */}
          <Companies />
        </Box>
        <Box id="latestProducts" mt={30} className={classes.firstTitle}>
          <Text fz={40} fw={700}>
            Latest products
          </Text>
        </Box>
        <Box mt={30} mb={40}>
          {/* === search with props is value to search about product   === */}
          {/* get true or false from search for get data */}
          <Search
            setSearchValue={setSearchValue}
            filterQuery={filterQuery}
            setIsValue={setIsValue}
            setIsValueSearch={setIsValueSearch}
          />
          <Box display={"flex"} style={{ justifyContent: "center" }}>
            <Divider
              label="Or Search With Filter"
              w={"40%"}
              my={10}
              styles={{ label: { color: "", alignItems: "center" } }}
            />
          </Box>
          {/* === filter === */}
          {/* get true or false from filter for get data */}
          <Filter setFilterQuery={setFilterQuery} setIsValue={setIsValue} />
        </Box>

        <Box my={10} className={classes.secondTitle}>
          <Text fz={30} fw={700}>
            Latest products:
          </Text>
        </Box>
        {/* === get data === */}
        <Box mb={isMobile ? 50 : 130} className={classes.containerCards}>
          {products.length > 0 ? (
            products.map((product) => (
              <Box key={product.id} className={classes.parentCard}>
                <Box className={classes.card}>
                  <Image className={classes.imageCard} src={product.image} />
                  <AddToFavorites id={product.id} />
                </Box>
                <Box className={classes.details}>
                  <Text className={classes.categoryText}>
                    {product.category}
                  </Text>
                  <Link to={`/products/${product.id}`} className={classes.text}>
                    {product.name}
                  </Link>
                  <Text fw={700} c={"red"} className={classes.price}>
                    {product.price}$
                  </Text>
                <Box className={classes.addToCart} mt={0}>
                  <AddToCart id={product.id} />
                </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Box>
              <Loading />
            </Box>
          )}
        </Box>

        {/* === Pagination === */}
        <Box mb={50} display={"flex"} style={{ justifyContent: "center" }}>
          {products.length >= 0 && (
            <Pagination
              // to get total page we need to get total products and divide it by 10 because we show 10 products in each page
              total={Math.ceil(limitProducts.length / 10)}
              value={page}
              onChange={setPage}
              color="black"
              size={isMobile ? "sm" : "lg"}
            />
          )}
        </Box>

        <Box></Box>
      </Box>
    </Box>
  );
}
