1| 
2| # NestJS GraphQL Authentication API
3| 
4| A RESTful API service using NestJS with TypeScript that supports user authentication (standard and biometric), registration, and utilizes Prisma as the ORM. The API is exposed through GraphQL.
5| 
6| ## Features
7| 
8| - User registration with email and password
9| - Standard login with email and password
10| - Biometric login
11| - JWT-based authentication
12| - GraphQL API
13| - PostgreSQL database with Prisma ORM
14| 
15| ## Prerequisites
16| 
17| - Node.js (v16 or higher)
18| - npm or yarn
19| - PostgreSQL database
20| 
21| ## Installation
22| 
23| 1. Clone the repository
24| 2. Install dependencies:
25| 
26| npm install 
27| 
28| ## to run locally 
29| 
30| npm run start:dev
31| 
32| 
33| 
34| ```
35| 
36| **Variables**:
37| 
38| ```json
39| {
40| "input": {
41| "email": "[user@example.com](mailto:user@example.com)",
42| "password": "password123"
43| }
44| }
45| 
46| ```plaintext
47| 
48| **Example Response**:
49| 
50| \`\`\`json
51| {
52|   "data": {
53|     "register": {
54|       "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
55|       "user": {
56|         "id": "550e8400-e29b-41d4-a716-446655440000",
57|         "email": "user@example.com",
58|         "createdAt": "2023-12-15T12:00:00.000Z",
59|         "updatedAt": "2023-12-15T12:00:00.000Z"
60|       }
61|     }
62|   }
63| }
64| ```
65| 
66| **Possible Errors**:
67| 
68| - Email already in use (409 Conflict)
69| - Invalid email format (400 Bad Request)
70| - Password too short (400 Bad Request)
71| 
72| 
73| **JavaScript Example**:
74| 
75| ```javascript
76| async function registerUser(email, password) {
77| const response = await fetch('[https://nextjs-backend-task.vercel.app/graphql](https://nextjs-backend-task.vercel.app/graphql)', {
78| method: 'POST',
79| headers: {
80| 'Content-Type': 'application/json',
81| },
82| body: JSON.stringify({
83| query: `        mutation Register($input: RegisterInput!) {
84|           register(input: $input) {
85|             accessToken
86|             user {
87|               id
88|               email
89|               createdAt
90|               updatedAt
91|             }
92|           }
93|         }
94|      `,
95| variables: {
96| input: {
97| email,
98| password
99| }
100| }
101| })
102| });
103| 
104| const data = await response.json();
105| 
106| if (data.errors) {
107| throw new Error(data.errors[0].message);
108| }
109| 
110| return data.data.register;
111| }
112| 
113| ```plaintext
114| 
115| ### Standard Login
116| 
117| Authenticates a user with email and password.
118| 
119| **Operation Type**: Mutation
120| 
121| **Operation Name**: Login
122| 
123| **Input**:
124| - `email`: String (required) - User's email address
125| - `password`: String (required) - User's password
126| 
127| **Returns**:
128| - `accessToken`: String - JWT token for authentication
129| - `user`: User object with id, email, biometricKey, createdAt, and updatedAt fields
130| 
131| **Example Request**:
132| 
133| ```graphql
134| mutation Login($input: LoginInput!) {
135|   login(input: $input) {
136|     accessToken
137|     user {
138|       id
139|       email
140|       biometricKey
141|       createdAt
142|       updatedAt
143|     }
144|   }
145| }
146| ```
147| 
148| **Variables**:
149| 
150| ```json
151| {
152| "input": {
153| "email": "[user@example.com](mailto:user@example.com)",
154| "password": "password123"
155| }
156| }
157| 
158| ```plaintext
159| 
160| **Example Response**:
161| 
162| \`\`\`json
163| {
164|   "data": {
165|     "login": {
166|       "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
167|       "user": {
168|         "id": "550e8400-e29b-41d4-a716-446655440000",
169|         "email": "user@example.com",
170|         "biometricKey": null,
171|         "createdAt": "2023-12-15T12:00:00.000Z",
172|         "updatedAt": "2023-12-15T12:00:00.000Z"
173|       }
174|     }
175|   }
176| }
177| ```
178| 
179| **Possible Errors**:
180| 
181| - Invalid credentials (401 Unauthorized)
182| - User not found (401 Unauthorized)
183| 
184| 
185| **JavaScript Example**:
186| 
187| ```javascript
188| async function loginUser(email, password) {
189| const response = await fetch('[https://nextjs-backend-task.vercel.app/graphql](https://nextjs-backend-task.vercel.app/graphql)', {
190| method: 'POST',
191| headers: {
192| 'Content-Type': 'application/json',
193| },
194| body: JSON.stringify({
195| query: `        mutation Login($input: LoginInput!) {
196|           login(input: $input) {
197|             accessToken
198|             user {
199|               id
200|               email
201|               biometricKey
202|               createdAt
203|               updatedAt
204|             }
205|           }
206|         }
207|      `,
208| variables: {
209| input: {
210| email,
211| password
212| }
213| }
214| })
215| });
216| 
217| const data = await response.json();
218| 
219| if (data.errors) {
220| throw new Error(data.errors[0].message);
221| }
222| 
223| return data.data.login;
224| }
225| 
226| ```plaintext
227| 
228| ### Biometric Login
229| 
230| Authenticates a user with a biometric key.
231| 
232| **Operation Type**: Mutation
233| 
234| **Operation Name**: BiometricLogin
235| 
236| **Input**:
237| - `biometricKey`: String (required) - User's biometric key
238| 
239| **Returns**:
240| - `accessToken`: String - JWT token for authentication
241| - `user`: User object with id, email, biometricKey, createdAt, and updatedAt fields
242| 
243| **Example Request**:
244| 
245| ```graphql
246| mutation BiometricLogin($input: BiometricLoginInput!) {
247|   biometricLogin(input: $input) {
248|     accessToken
249|     user {
250|       id
251|       email
252|       biometricKey
253|       createdAt
254|       updatedAt
255|     }
256|   }
257| }
258| ```
259| 
260| **Variables**:
261| 
262| ```json
263| {
264| "input": {
265| "biometricKey": "user-biometric-key-123"
266| }
267| }
268| 
269| ```plaintext
270| 
271| **Example Response**:
272| 
273| \`\`\`json
274| {
275|   "data": {
276|     "biometricLogin": {
277|       "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
278|       "user": {
279|         "id": "550e8400-e29b-41d4-a716-446655440000",
280|         "email": "user@example.com",
281|         "biometricKey": "user-biometric-key-123",
282|         "createdAt": "2023-12-15T12:00:00.000Z",
283|         "updatedAt": "2023-12-15T12:00:00.000Z"
284|       }
285|     }
286|   }
287| }
288| ```
289| 
290| **Possible Errors**:
291| 
292| - Invalid biometric key (401 Unauthorized)
293| - User not found (401 Unauthorized)
294| 
295| 
296| **JavaScript Example**:
297| 
298| ```javascript
299| async function biometricLogin(biometricKey) {
300| const response = await fetch('[https://nextjs-backend-task.vercel.app/graphql](https://nextjs-backend-task.vercel.app/graphql)', {
301| method: 'POST',
302| headers: {
303| 'Content-Type': 'application/json',
304| },
305| body: JSON.stringify({
306| query: `        mutation BiometricLogin($input: BiometricLoginInput!) {
307|           biometricLogin(input: $input) {
308|             accessToken
309|             user {
310|               id
311|               email
312|               biometricKey
313|               createdAt
314|               updatedAt
315|             }
316|           }
317|         }
318|      `,
319| variables: {
320| input: {
321| biometricKey
322| }
323| }
324| })
325| });
326| 
327| const data = await response.json();
328| 
329| if (data.errors) {
330| throw new Error(data.errors[0].message);
331| }
332| 
333| return data.data.biometricLogin;
334| }
335| 
336| ```plaintext
337| 
338| ### Set Biometric Key
339| 
340| Sets or updates the biometric key for an authenticated user.
341| 
342| **Operation Type**: Mutation
343| 
344| **Operation Name**: SetBiometricKey
345| 
346| **Input**:
347| - `biometricKey`: String (required) - New biometric key to set
348| 
349| **Authentication**: Required (JWT token)
350| 
351| **Returns**:
352| - `accessToken`: String - New JWT token for authentication
353| - `user`: User object with updated biometric key
354| 
355| **Example Request**:
356| 
357| ```graphql
358| mutation SetBiometricKey($input: SetBiometricKeyInput!) {
359|   setBiometricKey(input: $input) {
360|     accessToken
361|     user {
362|       id
363|       email
364|       biometricKey
365|       createdAt
366|       updatedAt
367|     }
368|   }
369| }
370| ```
371| 
372| **Variables**:
373| 
374| ```json
375| {
376| "input": {
377| "biometricKey": "new-biometric-key-456"
378| }
379| }
380| 
381| ```plaintext
382| 
383| **Headers**:
384| 
385| ```
386| 
387| Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
388| 
389| ```plaintext
390| 
391| **Example Response**:
392| 
393| \`\`\`json
394| {
395|   "data": {
396|     "setBiometricKey": {
397|       "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
398|       "user": {
399|         "id": "550e8400-e29b-41d4-a716-446655440000",
400|         "email": "user@example.com",
401|         "biometricKey": "new-biometric-key-456",
402|         "createdAt": "2023-12-15T12:00:00.000Z",
403|         "updatedAt": "2023-12-15T12:00:00.000Z"
404|       }
405|     }
406|   }
407| }
408| ```
409| 
410| **Possible Errors**:
411| 
412| - Unauthorized (401 Unauthorized)
413| - Biometric key already in use (409 Conflict)
414| 
415| 
416| **JavaScript Example**:
417| 
418| ```javascript
419| async function setBiometricKey(biometricKey, accessToken) {
420| const response = await fetch('[https://nextjs-backend-task.vercel.app/graphql](https://nextjs-backend-task.vercel.app/graphql)', {
421| method: 'POST',
422| headers: {
423| 'Content-Type': 'application/json',
424| 'Authorization': `Bearer ${accessToken}`
425| },
426| body: JSON.stringify({
427| query: `        mutation SetBiometricKey($input: SetBiometricKeyInput!) {
428|           setBiometricKey(input: $input) {
429|             accessToken
430|             user {
431|               id
432|               email
433|               biometricKey
434|               createdAt
435|               updatedAt
436|             }
437|           }
438|         }
439|      `,
440| variables: {
441| input: {
442| biometricKey
443| }
444| }
445| })
446| });
447| 
448| const data = await response.json();
449| 
450| if (data.errors) {
451| throw new Error(data.errors[0].message);
452| }
453| 
454| return data.data.setBiometricKey;
455| }
456| 
457| ```plaintext
458| 
459| ### Get Current User
460| 
461| Retrieves the profile of the currently authenticated user.
462| 
463| **Operation Type**: Query
464| 
465| **Operation Name**: Me
466| 
467| **Authentication**: Required (JWT token)
468| 
469| **Returns**: User object with id, email, biometricKey, createdAt, and updatedAt fields
470| 
471| **Example Request**:
472| 
473| ```graphql
474| query Me {
475|   me {
476|     id
477|     email
478|     biometricKey
479|     createdAt
480|     updatedAt
481|   }
482| }
483| ```
484| 
485| **Headers**:
486| 
487| ```plaintext
488| Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
489| ```
490| 
491| **Example Response**:
492| 
493| ```json
494| {
495| "data": {
496| "me": {
497| "id": "550e8400-e29b-41d4-a716-446655440000",
498| "email": "[user@example.com](mailto:user@example.com)",
499| "biometricKey": "user-biometric-key-123",
500| "createdAt": "2023-12-15T12:00:00.000Z",
501| "updatedAt": "2023-12-15T12:00:00.000Z"
502| }
503| }
504| }
505| 
506| ```plaintext
507| 
508| **Possible Errors**:
509| - Unauthorized (401 Unauthorized)
510| 
511| **JavaScript Example**:
512| 
513| \`\`\`javascript
514| async function getCurrentUser(accessToken) {
515|   const response = await fetch('https://nextjs-backend-task.vercel.app/graphql', {
516|     method: 'POST',
517|     headers: {
518|       'Content-Type': 'application/json',
519|       'Authorization': `Bearer ${accessToken}`
520|     },
521|     body: JSON.stringify({
522|       query: `
523|         query {
524|           me {
525|             id
526|             email
527|             biometricKey
528|             createdAt
529|             updatedAt
530|           }
531|         }
532|       `
533|     })
534|   });
535| 
536|   const data = await response.json();
537|   
538|   if (data.errors) {
539|     throw new Error(data.errors[0].message);
540|   }
541|   
542|   return data.data.me;
543| }
544| ```
545| 
546| ### Get User by ID
547| 
548| Retrieves a user by their ID. This operation requires authentication.
549| 
550| **Operation Type**: Query
551| 
552| **Operation Name**: GetUser
553| 
554| **Input**:
555| 
556| - `id`: ID (required) - ID of the user to retrieve
557| 
558| 
559| **Authentication**: Required (JWT token)
560| 
561| **Returns**: User object with id, email, biometricKey, createdAt, and updatedAt fields
562| 
563| **Example Request**:
564| 
565| ```plaintext
566| query GetUser($id: ID!) {
567|   user(id: $id) {
568|     id
569|     email
570|     biometricKey
571|     createdAt
572|    

