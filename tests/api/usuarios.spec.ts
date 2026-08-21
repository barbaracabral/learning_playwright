import { expect, test } from '@playwright/test';
import { UsuarioAPIPage } from '../pages/usuario-api-page';
import type { Usuario } from '../types';

let response: any;

/* This test suite demonstrates how to use Playwright to test API interactions with mocked responses.
 * It includes tests for listing, creating, updating, and deleting users via mocked API calls.
 */
test.describe('Usuários - mocks de API', () => {
  test('deve listar usuários via mock GET', async ({ page }) => {
    const usuarioAPI = new UsuarioAPIPage(page);
    const fakeUser = usuarioAPI.buildFakeUsuario();

    await usuarioAPI.mockGetUsuarios([fakeUser]);

    response = await page.evaluate(async (user) => {
      const res = await fetch('https://example.com/usuarios');
      return res.json();
    }, fakeUser);

    expect((response).quantidade).toBe(1);
    expect((response).usuarios[0]).toMatchObject({
      nome: fakeUser.nome,
      email: fakeUser.email
    });
  });

  test('deve criar usuário via mock POST', async ({ page }) => {
    const usuarioPage = new UsuarioAPIPage(page);
    const newUser: Usuario = usuarioPage.buildFakeUsuario({
      _id: 'created-user-id',
      nome: 'Novo Usuário',
      email: 'novo.usuario@example.com'
    });

    await usuarioPage.mockCreateUsuario(newUser);

    response = await page.evaluate(async (payload) => {
      const res = await fetch('https://example.com/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return res.json();
    }, newUser);

    expect(response.usuario).toMatchObject({
      nome: newUser.nome,
      email: newUser.email,
      _id: 'created-user-id'
    });
  });

  test('deve atualizar usuário via mock PUT', async ({ page }) => {
    const usuarioPage = new UsuarioAPIPage(page);
    const updatedUser: Usuario = usuarioPage.buildFakeUsuario({
      _id: 'updated-user-id',
      nome: 'Usuário Atualizado',
      email: 'atualizado@example.com'
    });

    await usuarioPage.mockUpdateUsuario(updatedUser);

    response = await page.evaluate(async (payload) => {
      const res = await fetch('https://example.com/usuarios', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return res.json();
    }, updatedUser);

    expect(response.usuario).toMatchObject({
      nome: updatedUser.nome,
      email: updatedUser.email,
      _id: 'updated-user-id'
    });
  });

  test('deve deletar usuário via mock DELETE', async ({ page }) => {
    const usuarioPage = new UsuarioAPIPage(page);

    await usuarioPage.mockDeleteUsuario('fake-user-id');

    response = await page.evaluate(async () => {
      const res = await fetch('https://example.com/usuarios', {
        method: 'DELETE'
      });
      return res.json();
    });

    expect(response.message).toContain('deletado com sucesso');
  });
});
