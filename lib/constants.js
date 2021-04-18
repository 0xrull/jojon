const { gql } = require('graphql-request');

const endpointPP = 'https://prod.pp-app-api.com/v1/graphql';

const qRegist = gql`
    mutation insert_multiple_users($objects: [users_insert_input!]!) {
        insert_users(objects: $objects) {
            returning {
                id
                __typename
            }
            __typename
        }
    }
    `;


const qInsertNewInstal = gql`
mutation insert_new_install($object: installs_insert_input!) {
    insert_installs_one(object: $object) {
        install_id
        user_id
        __typename
      }
  }
`;

const qData = gql`
          {
            users {
             id
             first_name
             last_name
             wallet_address
            }
        }
        `;

const qValid = gql`
        {
           tracking_numbers {
             created_at
             id
             result
             scan_id
             transaction_key
             value
           }
         }
        `;

const qScan = gql`
        mutation insert_multiple_scans($objects: [scans_insert_input!]!) {
            insert_scans(objects: $objects) {
                returning {
                    id
                    __typename
                }
                __typename
            }
        }
        `;


const qWallet = gql`
         mutation update_user($wallet_address: String!) {
                update_users(where: {}, _set: {wallet_address: $wallet_address}) {
                    affected_rows
                    returning {
                        id
                        wallet_address
                        __typename
                    }
                    __typename
                }
            }`;

const qBatch = gql`
            {
               scans(order_by: {created_at: desc}) {
                 id
                 tracking_number
                 created_at
                 batch_uuid
                 tracking_numbers(where: {result: {_eq: "valid"}}) {
                   created_at
                   transaction_key
                   __typename
                 }
                 tracking_numbers_aggregate {
                   aggregate {
                     count
                     __typename
                   }
                   __typename
                 }
                 __typename
               }
             }
            `

module.exports = {
    endpointPP,
    qRegist,
    qInsertNewInstal,
    qData,
    qValid,
    qScan,
    qWallet,
    qBatch
}