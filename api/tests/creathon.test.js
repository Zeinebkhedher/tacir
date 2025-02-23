// api/tests/creathon.test.js
const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js or server.js
const mongoose = require('mongoose');
const Creathon = require('../models/creathonModel'); // Adjust the path based on your project structure

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb+srv://zeinebkheder:WwlPhehRonx4nQqH@cluster0.ue5xx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

afterEach(async () => {
  // Clear collections after each test
  await Creathon.deleteMany({});
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

describe('POST /api/creathons/create', () => {
  test('Should return 400 if dateDebut is not earlier than dateFin', async () => {
    const response = await request(app)
      .post('/api/creathons/create')
      .send({
        titre: 'Invalid Date Creathon',
        dateDebut: '2024-06-03T00:00:00.000Z',
        dateFin: '2024-06-01T00:00:00.000Z',
        lieu: 'Test Location',
        affiche: 'Test Path',
        status: 'en cours',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('La date de début doit être inférieure à la date de fin');
  });

  test('Should create a creathon when input is valid', async () => {
    const response = await request(app)
      .post('/api/creathons/create')
      .send({
        "titre": "Valid Creathon",
        "dateDebut": "2025-12-11T00:00:00.000Z",
        "dateFin": "2025-12-12T00:00:00.000Z",
        "lieu": "Emplacement du creathon",
        "affiche": "Chemin vers l'affiche",
        "status": "en cours"
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Creathon créé avec succès');
    expect(response.body.creathon.titre).toBe('Valid Creathon');

    // Verify if the creathon exists in the database
    const createdCreathon = await Creathon.findOne({ titre: 'Valid Creathon' });
    expect(createdCreathon).not.toBeNull();
    expect(createdCreathon.titre).toBe('Valid Creathon');
  });

  test('Should return 500 if an error occurs', async () => {
    jest.spyOn(Creathon.prototype, 'save').mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const response = await request(app)
      .post('/api/creathons/create')
      .send({
        titre: 'Valid Creathon',
        dateDebut: '2024-06-01T00:00:00.000Z',
        dateFin: '2024-06-03T00:00:00.000Z',
        lieu: 'Valid Location',
        affiche: 'Valid Path',
        status: 'en cours',
      });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Database error');
  });
});
