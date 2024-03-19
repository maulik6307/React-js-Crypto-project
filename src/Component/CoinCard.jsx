import React from "react";
import { Link } from "react-router-dom";
import { Heading, VStack, Image, Text } from "@chakra-ui/react";

const CoinCard = ({ name, img, symbol, id, price, currencysymbol = "₹" }) => {
  return (
    <Link to={`/coins/${id}`}>
      <VStack
        w={"52"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"8"}
        transition={"all 0.3s"}
        m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image
          src={img}
          w={"10"}
          h={"10"}
          objectFit={"contain"}
          alt={"Coins"}
        />

        <Heading size={"md"}>{symbol}</Heading>
        <Text size={"md"} noOfLines={1}>
          {name}
        </Text>
        <Text size={"md"} noOfLines={1}>
          {price ? `${currencysymbol}${price}` : "NA"}
        </Text>
      </VStack>
    </Link>
  );
};

export default CoinCard;
