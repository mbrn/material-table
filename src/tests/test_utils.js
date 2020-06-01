const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Birthcity', field: 'city', type: "string" },
    { title: 'Age', field: 'age', type: "numeric" },
    { title: 'Birthyear', field: 'date', type: "date" },
    { title: 'Birthdate', field: 'date', type: "datetime" },
    { title: 'Money', field: 'money', type: "currency" },
    { title: 'Is available', field: 'available', type: "boolean" },
];

const data = [
    { name: 'Baran', city: 'Istanbul', age: 30, date: new Date(0), money: 500, available: true },
    { name: 'Dominik', city: 'Aachen', age: 26, date: new Date('2020-11-11'), money: 0, available: false },
];

function getColumns(count = columns.length) {
    return columns.slice(0, count);
}

function getData(count = data.length) {
    return data.slice(0, count);
}


export {
    columns,
    data,
    getColumns,
    getData,
};