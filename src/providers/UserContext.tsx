import { createContext, useContext, useEffect, useState } from 'react';
import { fakerEN as faker } from '@faker-js/faker';
export type User = {
    id: string
    fullName: string;
    email: string;
    department: DepartmentType;
};
export enum DepartmentType {
    Sales = "Sales",
    Marketing = "Marketing",
    IT = "IT",
    Management = "Management",
    HR = "HR",
}

export const listOfDepartments = Object.values(DepartmentType);

export const getDepartmentColor = (department: DepartmentType) => {
    switch (department) {
        case DepartmentType.Sales:
            return "primary";
        case DepartmentType.Marketing:
            return "secondary";
        case DepartmentType.IT:
            return "success";
        case DepartmentType.Management:
            return "info";
        case DepartmentType.HR:
            return "warning";
    }
}

function randomPeople(n: number): User[] {
    return Array.from({ length: n }, (_, i) => {
        const fullname = faker.person.fullName();

        return {
            id: faker.string.uuid(),
            fullName: fullname,
            email: fullname.split(" ")[1].toLowerCase() + "@example.com",
            department: faker.helpers.enumValue(DepartmentType),
        };

    });
}
type UserContext = {
    users: User[];
    addUser: (user: User) => void;
    setAll: (users: User[]) => void;

}

const userContextDefaultValues: UserContext = {
    users: [],
    addUser: () => { },
    setAll: () => { },

};


const UserContext = createContext<UserContext>(userContextDefaultValues);
export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [users, setUsers] = useState<User[]>([]);


    //make a useEffect to check if localStorage("usersStorage") contains users and set it to users
    //if not, set the users to randomPeople(10) and set it to localStorage("usersStorage")
    //also check consistency
    useEffect(() => {
        const usersStorage = localStorage.getItem("usersStorage");
        if (usersStorage) {
            const parsedUsers = JSON.parse(usersStorage) as User[];
            setUsers(parsedUsers);
        } else {
            const randomUsers = randomPeople(10);
            setUsers(randomUsers);
            localStorage.setItem("usersStorage", JSON.stringify(randomUsers));
        }
    }, []);

    const addUser = (user: User) => {
        setUsers((prev) => [...prev, user]);
        localStorage.setItem("usersStorage", JSON.stringify([...users, user]));
    };
    const setAll = (users: User[]) => {
        setUsers(users);
        localStorage.setItem("usersStorage", JSON.stringify(users));
    }



    return (
        <UserContext.Provider value={{ users, addUser, setAll }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;