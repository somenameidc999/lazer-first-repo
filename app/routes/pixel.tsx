import db from "../db.server";
import { json } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const headers = request.headers;
  const shop = headers.get('origin');

  if (typeof shop === "string" && shop.length) {
    let record = await db.counts.findFirst({ where: { shop } });
    if (!record || !record?.id) {
      record = await db.counts.create({
        data: {
          shop,
          count: 0
        }
      })
    }

    if (record) {
      let count = (record.count || 0) + 1;
      await db.counts.update({
        where: { id: record.id },
        data: { count },
      });
    }
  }

  return json({});
};
