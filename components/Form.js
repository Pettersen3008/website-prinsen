import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";

function InputForm({id, type}) {
  const [input, setInput] = useState("");

  const isError = input === "";
  
  return (
      <FormControl isInvalid={isError} mb={6}>
        <FormLabel htmlFor={id}>{id[0].toUpperCase() + id.slice(1)}</FormLabel>
        <Input
          id={id}
          type={type}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        {!isError ? (
            null
        ) : (
          <FormErrorMessage>Du må skrive inn {id}</FormErrorMessage>
        )}
      </FormControl>
  );
}

export default InputForm;
