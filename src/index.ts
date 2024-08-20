import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';
import { Env } from './env.js';

import manifestJSON from '__STATIC_CONTENT_MANIFEST';
const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

		const page = await getAssetFromKV(
		{
				request,
				waitUntil: ctx.waitUntil.bind(ctx),
			},
			{
				ASSET_NAMESPACE: env.__STATIC_CONTENT,
				ASSET_MANIFEST: assetManifest,
			});

			const response = new Response(page.body, page);
			return response;
  }
} satisfies ExportedHandler<Env>;
