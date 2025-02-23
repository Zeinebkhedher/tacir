const request = require('supertest');
const app = require('../app'); 
const mongoose = require('mongoose');
const CandidatCreathon = require('../models/candidatCreathon'); 

// Example token provided
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1icmVJZCI6IjY3ODhlYTNiZmRkZmE3OGNiZDAyZDllZiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiemVpbmVia2hlZGVyMDhAZ21haWwuY29tIiwiaWF0IjoxNzM3MDI2MjI4LCJleHAiOjE3MzcxMTI2Mjh9.GeKcZAmHh__nzTltGuOV4ngy7U0vbwZMPQY9nYDvv24';

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb+srv://zeinebkheder:WwlPhehRonx4nQqH@cluster0.ue5xx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  // Optionally, clear collections before tests
  await CandidatCreathon.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/candidatureCreathon/sendCandidatureCreathon', () => {
  test('Should create a new Candidat Creathon when logged in', async () => {
    const response = await request(app)
      .post('/api/candidatureCreathon/sendCandidatureCreathon')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nom: 'nour',
        prenom: 'candidat',
        email: 'zeinebkheder8@gmail.com',
        titre: 'Titre du projet',
        descriptif: 'Description du projet',
        ideeProjet: 'Idée du projet',
        lien: 'Lien vers le projet',
        creathon: '678a84ce03a17ed4544eba83',
      });
  
    if (response.status !== 201) {
      console.error('Response:', response.body);
    }
  
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Candidat Creathon créé avec succès');
  });
    

  test('Erreur lors de la création du candidat Creathon', async () => {
    const response = await request(app)
      .post('/api/candidatureCreathon/sendCandidatureCreathon')
      .send({
        nom: 'Jane',
        prenom: 'Smith',
        email: 'jane.smith@example.com',
        titre: 'Titre du projet',
        descriptif: 'Description du projet',
        ideeProjet: 'Idée du projet',
        lien: 'Lien vers le projet',
        creathon: '678a83fd9e40e1bef2d3b952',
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Veuillez vous connecter d'abord");
  });

  test('Should return 403 if token is invalid', async () => {
    const response = await request(app)
      .post('/api/candidatureCreathon/sendCandidatureCreathon')
      .set('Authorization', 'Bearer invalidtoken')
      .send({
        nom: 'Invalid',
        prenom: 'User',
        email: 'invalid.user@example.com',
        titre: 'Invalid Project',
        descriptif: 'Invalid Project Description',
        ideeProjet: 'Invalid Idea',
        lien: 'http://invalid-project-link.com',
        creathon: '665a3c8b615029bcfb6ccc55',
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Veuillez vous connecter d'abord" );
  });
});
