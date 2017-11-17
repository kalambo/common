import { Enhancer, enhancers } from 'rgo';
import * as Knex from 'knex';

import isValid from './isValid';

export const previous = (knex: Knex) =>
  enhancers.mapUpdates(async (type, id, _, { context }) => {
    context.previous = context.previous || {};
    context.previous[type] = context.previous[type] || {};
    if (id) {
      context.previous[type][id] =
        (id &&
          (await knex(type)
            .where('id', id)
            .first())) ||
        null;
    }
  }) as Enhancer;

export const timestamps = enhancers.mapUpdates(async (_, id, record) => {
  if (record) {
    const time = new Date();
    return {
      ...id ? {} : { createdat: time },
      modifiedat: time,
      ...record,
    };
  }
}) as Enhancer;

export const logging = enhancers.mapUpdates(
  async (type, id, record, { context: { previous } }) => {
    const prev: Obj | null = previous[type][id!] || null;
    if (record) {
      if (id) {
        console.log(
          `rgo-commit-update, ${type}:${id}, ` +
            `old: ${JSON.stringify(prev)}, new: ${JSON.stringify(record)}`,
        );
      } else {
        console.log(
          `rgo-commit-insert, ${type}, new: ${JSON.stringify(record)}`,
        );
      }
    } else if (id) {
      console.log(
        `rgo-commit-delete, ${type}:${id}, old: ${JSON.stringify(prev)}`,
      );
    }
  },
) as Enhancer;

export const validate = enhancers.mapUpdates(
  async (type, _, record, { schema }) => {
    if (record) {
      for (const f of Object.keys(record)) {
        if (
          !isValid(
            {
              scalar: (schema[type][f] as any).scalar || 'string',
              optional: true,
              ...schema[type][f].meta,
            },
            record[f],
            record,
          )
        ) {
          throw new Error('Invalid data');
        }
      }
    }
  },
) as Enhancer;
