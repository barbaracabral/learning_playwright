import { expect, type Locator, type Page } from '@playwright/test';
import type { ApiErrorResponse, Usuario, UsuarioResponse, UsuariosListResponse } from '../types';
import fakeUsuarioData from '../fixtures/usuario-fake.json';

export class UsuarioAPIPage {
  private readonly heading: Locator;

  constructor(public readonly page: Page) {
    this.heading = this.page.getByRole('heading', { name: /usuarios/i });
  }

  async goto() {
    await this.page.goto('about:blank');
  }

  buildFakeUsuario(overrides: Partial<Usuario> = {}): Usuario {
    return {
      ...fakeUsuarioData,
      ...overrides
    } as Usuario;
  }

  async mockGetUsuarios(users: Usuario[] = []) {
    await this.page.route('**/usuarios**', async (route, request) => {
      if (request.method() !== 'GET') {
        await route.continue();
        return;
      }

      const payload: UsuariosListResponse = {
        quantidade: users.length,
        usuarios: users
      };

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(payload)
      });
    });
  }

  async mockCreateUsuario(user: Usuario = this.buildFakeUsuario()) {
    await this.page.route('**/usuarios**', async (route, request) => {
      if (request.method() !== 'POST') {
        await route.continue();
        return;
      }

      const payload: UsuarioResponse = {
        usuario: {
          ...user,
          _id: user._id ?? 'created-user-id'
        }
      };

      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify(payload)
      });
    });
  }

  async mockUpdateUsuario(user: Usuario) {
    await this.page.route('**/usuarios**', async (route, request) => {
      if (request.method() !== 'PUT') {
        await route.continue();
        return;
      }

      const payload: UsuarioResponse = {
        usuario: {
          ...user,
          _id: user._id ?? 'updated-user-id'
        }
      };

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(payload)
      });
    });
  }

  async mockDeleteUsuario(userId: string = 'fake-user-id') {
    await this.page.route('**/usuarios**', async (route, request) => {
      if (request.method() !== 'DELETE') {
        await route.continue();
        return;
      }

      const payload = {
        message: `Usuário ${userId} deletado com sucesso`
      } satisfies ApiErrorResponse;

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(payload)
      });
    });
  }

  async expectHeadingVisible() {
    await expect(this.heading).toBeVisible();
  }
}
