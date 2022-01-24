import {Table, TableCaption, Tr, Thead, Tbody, Td, Th, Flex} from '@chakra-ui/react'
import dbConnect from '../lib/dbConnect';
import User from '../models/users';

export default function registrert({users}) {
    return (
        <Table variant='striped' colorScheme='teal'>
        <TableCaption>Brukere registrert hos prinsen cafe</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Fornavn</Th>
            <Th>Etternavn</Th>
            <Th>Telefon</Th>
            <Th>Dato</Th>
          </Tr>
        </Thead>
        <Tbody>
            {users.map(users => (
                <Tr key={users.id}>
                    <Td>{users.id}</Td>
                    <Td>{users.firstname}</Td>
                    <Td>{users.lastname}</Td>
                    <Td>{users.phone}</Td>
                    <Td>{users.createdAt}</Td>
                </Tr>
            ))}
        </Tbody>
      </Table>
    )
}

// server side props
export async function getServerSideProps() {
    // Connect to the database
    await dbConnect()
        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            throw new Error(err);
        });

    // Get all users and convert to json
    const users = await User.find({});
    const data = JSON.parse(JSON.stringify(users));
    
    // Check if data are older than 14 days
    const now = new Date();
    const date = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    // Remove all users older than 14 days
    for (let i = 0; i < data.length; i++) {
        if (data[i].createdAt < date) {
            data.splice(i, 1);
        }
    }

    return {
        props: {
            users: data,
        }
    }
}

