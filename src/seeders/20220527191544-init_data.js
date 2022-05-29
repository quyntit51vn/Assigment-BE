'use strict';
const randomInt = (min = 1000000, max = null) => {
  if (max == null)
    return Math.floor(Math.random() * min) + min;
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {

  async up(queryInterface, Sequelize) {

    const firstName = ['Blackey', 'Hoe', 'Bana', 'Join', 'Hely', 'Goal']
    const lastName = ['Doe', 'Goo', 'Mada', 'Haki', 'Nguyen']
    const birthDate = [new Date(1998, 10, 11), new Date(1992, 2, 11), new Date(1987, 3, 6)]
    const birthPlace = ['Vietnam', 'China', 'Japan', 'American']
    const students = Array(10).fill().map((data, index) => {
      const name = firstName[randomInt(0, firstName.length - 1)] + " " + lastName[randomInt(0, lastName.length - 1)]
      const email = name.toLocaleLowerCase().replace(" ", "") + 'st' + randomInt(0, 100) + '@gmail.com'
      const record = {
        id: index + 1,
        name,
        email,
        avatar: `https://www.w3schools.com/w3images/avatar${randomInt(1, 6)}.png`,
        birth_date: birthDate[randomInt(0, birthDate.length - 1)],
        birth_place: birthPlace[randomInt(0, birthPlace.length - 1)],
        sex: randomInt(0, 1) ? 'male' : 'female',
        role: 'STUDENT'
      }
      return record
    })
    const leaders = Array(5).fill().map((data, index) => {
      const name = firstName[randomInt(0, firstName.length - 1)] + " " + lastName[randomInt(0, lastName.length - 1)]
      const email = name.toLocaleLowerCase().replace(" ", "") + 'st' + randomInt(0, 100) + '@gmail.com'
      const record = {
        id: index + 11,
        name,
        email,
        avatar: `https://www.w3schools.com/w3images/avatar${randomInt(1, 6)}.png`,
        birth_date: birthDate[randomInt(0, birthDate.length - 1)],
        birth_place: birthPlace[randomInt(0, birthPlace.length - 1)],
        sex: randomInt(0, 1) ? 'male' : 'female',
        role: 'LEADER'
      }
      return record
    })
    await queryInterface.bulkInsert('users', students.concat(leaders), {});
    const dateStart = [new Date(2022, 10, 11, 13, 0, 0), new Date(2022, 20, 11, 15, 0, 0), new Date(2022, 5, 5, 7, 0, 0)]
    const name = ['Typography', 'Web designers', 'Chemistry', 'Backmagicians', 'Blockchain']
    const groups = name.map((e, index) => {
      return {
        id: index + 1,
        date_start: dateStart[randomInt(0, dateStart.length - 1)],
        name: e,
        subject: 'None',
        leader_id: randomInt(11, 15)
      }
    })
    await queryInterface.bulkInsert('groups', groups, {});
    const group_user = students.map((student) => {
      return {
        user_id: student.id,
        group_id: randomInt(1, name.length)
      }
    })
    await queryInterface.bulkInsert('group_user', group_user, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
