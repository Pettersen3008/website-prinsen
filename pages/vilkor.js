import {Flex, Text, Heading, Link} from "@chakra-ui/react";

function vilkår() {
    return (
        <Flex h="100vh" w="100vw" justifyContent={"center"} alignItems={"center"}>
            <Flex w="80%" h="80%" direction={"column"}>
                <Heading mb={12} as="h1" size="2xl" textAlign="center">Vilkår</Heading>
                <Text mb={12}>
                    Når du samtykker til denne tjenesten blir dine data bevart hos oss i en database, denne dataen blir automatisk slettet etter 14 dager.

                    Formålet med data-innhentingen er å ivareta nasjonale bestemmelser i forbindelsen med covid-19 pandemien.
                </Text>

                <Link href="/" color="lightblue">Tilbake</Link>
            </Flex>
        </Flex>
    )
}

export default vilkår
