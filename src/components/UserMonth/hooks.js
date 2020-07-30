import { useState, useEffect } from 'react';

export const useUsersFetch = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {

        fetch("https://yalantis-react-school-api.yalantis.com/api/task0/users")
        .then(res => res.json())
        .then(res => {
            setIsLoaded(true);
            setUsers(res);
        })
        .catch((error) => {
            setIsLoaded(true);
            setError(error)
        })

    }, []);

    return [
        users,
        error,
        isLoaded
    ];
};

export const useUsersSelect = () => {
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleMouseOver = users => e => {
        const previous = document.getElementsByClassName('selected');

        if (previous.length > 0) previous.item(0).classList.remove('selected')

        setSelectedUsers(users)

        e.currentTarget.classList.add('selected')
    }

    return {
        handleMouseOver,
        selectedUsers
    };
};

export const useMonths = users => {
    const [usersMonths, setUsersMonths] = useState([]);

    useEffect(() => {
        const usersMonths = []

        for (let month = 0; month <= 11; month++) {
            let mounthName = new Date(2020, month, 1).toLocaleString('default', { month: 'long' })
            usersMonths.push({ name: mounthName, number: month, users: [] })
        }
        
        users.forEach(user => {
            const mob = new Date(user.dob).getMonth()
            user.dob = user.dob.toLocaleString('default', { year: 'numeric', month: 'long' })

            usersMonths[mob].users.push(user)
        })
        setUsersMonths(usersMonths)
    }, [users]);

    return usersMonths
};