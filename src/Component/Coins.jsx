import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "..";
import { Button, Container, HStack, RadioGroup, Radio } from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setcoins] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [pages, setpages] = useState(1);
  const [currency, setcurrency] = useState("inr");

  const currencysymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (pages) => {
    setpages(pages);
    setloading(true);
  };

  const btn = new Array(132).fill(1);

  useEffect(() => {
    const fetchcoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${pages}`
        );

        setcoins(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    };

    fetchcoins();
  }, [currency, pages]);

  if (error) {
    return <Error messages={"Error While Fetching Coins"}></Error>;
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value="inr">INR(₹)</Radio>
              <Radio value="eur">EUR(€)</Radio>
              <Radio value="usd">USD($)</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => {
              return (
                <CoinCard
                  id={i.id}
                  key={i.id}
                  name={i.name}
                  img={i.image}
                  price={i.current_price}
                  symbol={i.symbol}
                  currencysymbol={currencysymbol}
                />
              );
            })}
          </HStack>

          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btn.map((item, index) => {
              return (
                <Button
                  key={index}
                  bgColor={"blackAlpha.900"}
                  color={"white"}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </Button>
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
