import { faker, Faker } from "@faker-js/faker";

function createRandomCarList() {
  return {
    name: faker.vechile.vechile(),
    fuelType: faker.vehicle.fuel(),
    model: faker.vechile.model(),
    type: faker.vechile.type(),
    image: "",
    miles: 1000,
    gearType: "Automatic",
    price: faker.finance.amount({ min: 4000, max: 20000 }),
  };
}
const carList = faker.helpers.multiple(createRandomCarList, {
  count: 7,
});
export default carList;
