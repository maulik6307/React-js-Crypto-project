import {
  Box,
  Container,
  HStack,
  RadioGroup,
  Radio,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../index";
import Error from "./Error";
import Chart from "./Chart";

const CoinDetails = () => {
  const params = useParams();
  const [coin, setcoin] = useState({});
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [currency, setcurrency] = useState("inr");
  const [days, setdays] = useState("24h");
  const [chartArray, setchartArray] = useState([]);

  const currencysymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  const switchchartstate = (key) => {
    switch (key) {
      case "24h":
        setdays("24h");
        setloading(true);
        break;

      case "7d":
        setdays("7d");
        setloading(true);
        break;

      case "14d":
        setdays("14d");
        setloading(true);
        break;

      case "30d":
        setdays("30d");
        setloading(true);
        break;

      case "60d":
        setdays("60d");
        setloading(true);
        break;

      case "200d":
        setdays("200d");
        setloading(true);
        break;

      case "365d":
        setdays("365d");
        setloading(true);
        break;

      case "max":
        setdays("max");
        setloading(true);
        break;

      default:
        setdays("24h");
        setloading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchcoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartdata } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        setcoin(data);
        setchartArray(chartdata.prices);
        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    };

    fetchcoin();
  }, [params.id, currency, days]);

  if (error) {
    return <Error messages={"Error While Fetching Coin"}></Error>;
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} borderWidth={1}>
            <Chart arr={chartArray} currency={currencysymbol} days={days} />
          </Box>

          <HStack p={"4"} overflowX={"auto"}>
            {btns.map((i) => (
              <Button key={i} onClick={() => switchchartstate(i)}>
                {i}
              </Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value="inr">INR(₹)</Radio>
              <Radio value="eur">EUR(€)</Radio>
              <Radio value="usd">USD($)</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
            <Text fontSize={"small"} alignItems="center" opacity={0.7}>
              Last Updated On{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencysymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge
              fontSize={"2xl"}
              bgColor={"blackAlpha.800"}
              color={"white"}
            >{`#${coin.market_cap_rank}`}</Badge>

            <CustomBar
              high={`${currencysymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencysymbol}${coin.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} p={"4"}>
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencysymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencysymbol}${coin.market_data.ath[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencysymbol}${coin.market_data.atl[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} m={"4"}>
    <Text fontFamily={"Poppins"} fontWeight={"700"}>
      {title}
    </Text>
    <Text fontFamily={"Poppins"} fontWeight={"700"}>
      {value}
    </Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme="red" />
      <Text fontSize={"sm"}>24 Hour Range</Text>
      <Badge children={high} colorScheme="green" />
    </HStack>
  </VStack>
);

export default CoinDetails;
