## Repository link
https://github.com/rmit-fsd-2025-s1/s4090676-s4106761-a1

<img width="867" alt="Screenshot 2025-03-18 at 6 36 36 pm" src="https://github.com/user-attachments/assets/900406bd-ba9c-4025-83d5-aaf23d715985" />

## Account information

Account information can be found in `src/context/localstorage/defaults.ts`.



```
  {
    id: "TUTOR-1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    type: AccountType.TUTOR,
    availability: Availability.FULLTIME,
    skills: ["Knitting", "Singing"],
    credentials: ["COSC2801"],
  },
```

```
  {
    id: "LEC-1",
    name: "Jill Coltrane",
    email: "jill@example.com",
    password: "password123",
    type: AccountType.LECTURER,
  },
```

Accounts can also be made with the form!

## Tests

There are tests in `__tests__` folders around the project!

## Libraries

- https://icones.js.org/collection/ph with Phosphor icons
- Chakra UI

## Running the project

```bash
npm run dev
```

Open [http://[::]:3000](http://[::]:3000) with your browser to see the result.
