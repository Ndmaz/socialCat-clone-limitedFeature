1. How do you prevent duplicate approvals?

duplicate approvals are prevented mostly at database level,
walletLedger table has a one to one relationship with submission table with a unique constraint on the
submissionId, this will prevent duplicate wallet ledger creation on the same submission and also on the
concurent scenario too

2. Why did you choose this database structure? 

a campaign has a many to one relationship with submission table since many submission can be on a campaign but
a submission should not have many campaigns,
each submission has a one to one relationship with the walletledger with walletledger marked optional since
a ledger should exist apon approval and not before, this will make the ledger depened on the workflow

3. What would break first at 1,000 campaigns?

without proper pagination and index or cache, the likely straint will be on the retrival and managment of submissions info, since growth on campaigns and submission will cause more request time and also memory usage for 
retrieving submissions on each campaign

4. What did you intentionally NOT build, and why?

i didnt build a session managment model which will be used in role distinctions and implementaion of a authentication flow, i also didnt expand on the useFetching hook for crud operations since its used in a limited capacity and in implementation of pagination i limited it to page one with 20 item

5. Where would real payouts (e.g. Stripe) integrate later? 

since payment is dependent on walletledger status being released, a clean way to approach it would be to create
a payment table on a one to one relationship with the walletledger table, seperating their usage by having the walletledger info frequent and the payment is called on payment call and storing info related to that
