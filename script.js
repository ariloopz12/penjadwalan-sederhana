const courses = ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Bahasa Inggris'];
const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
const times = ['08:00 - 10:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00'];

function generateSchedule() {
  const populationSize = 10;
  const generations = 100;
  let population = generateInitialPopulation(populationSize);

  for (let i = 0; i < generations; i++) {
    population = evolve(population);
  }

  const bestSchedule = population[0];
  displaySchedule(bestSchedule);
}

function generateInitialPopulation(size) {
  let population = [];
  for (let i = 0; i < size; i++) {
    population.push(generateRandomSchedule());
  }
  return population;
}

function generateRandomSchedule() {
  let schedule = [];
  for (let i = 0; i < courses.length; i++) {
    const day = days[Math.floor(Math.random() * days.length)];
    const time = times[Math.floor(Math.random() * times.length)];
    schedule.push({ course: courses[i], day: day, time: time });
  }
  return schedule;
}

function evolve(population) {
  const newPopulation = population.slice(0, population.length / 2); // Select the best half
  while (newPopulation.length < population.length) {
    const parent1 = newPopulation[Math.floor(Math.random() * newPopulation.length)];
    const parent2 = newPopulation[Math.floor(Math.random() * newPopulation.length)];
    const child = crossover(parent1, parent2);
    mutate(child);
    newPopulation.push(child);
  }
  newPopulation.sort((a, b) => fitness(b) - fitness(a));
  return newPopulation;
}

function crossover(parent1, parent2) {
  const child = [];
  for (let i = 0; i < parent1.length; i++) {
    child.push(Math.random() > 0.5 ? parent1[i] : parent2[i]);
  }
  return child;
}

function mutate(schedule) {
  if (Math.random() > 0.1) return;
  const index = Math.floor(Math.random() * schedule.length);
  const newDay = days[Math.floor(Math.random() * days.length)];
  const newTime = times[Math.floor(Math.random() * times.length)];
  schedule[index] = { ...schedule[index], day: newDay, time: newTime };
}

function fitness(schedule) {
  let score = 0;
  const seen = {};
  for (const session of schedule) {
    const key = `${session.day}-${session.time}`;
    if (seen[key]) {
      score -= 1; // Conflict detected
    } else {
      score += 1; // No conflict
    }
    seen[key] = true;
  }
  return score;
}

function displaySchedule(schedule) {
  const scheduleDiv = document.getElementById('schedule');
  scheduleDiv.innerHTML = '';
  schedule.forEach((session) => {
    const sessionDiv = document.createElement('div');
    sessionDiv.innerHTML = `<strong>${session.course}</strong> - ${session.day} - ${session.time}`;
    scheduleDiv.appendChild(sessionDiv);
  });
}
