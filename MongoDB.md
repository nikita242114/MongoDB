---


---

<h1 id="лабораторная-работа.-документ-ориентированные-субд.-mongodb">Лабораторная работа. Документ-ориентированные СУБД. MongoDB</h1>
<p><a href="https://metanit.com/nosql/mongodb/1.1.php">Metanit</a><br>
<a href="https://classmech.ru/pages/databases/lab_nosql">ClassMech</a><br>
<a href="https://stepik.org/lesson/44717/step/1?unit=22431">Stepic</a></p>
<h2 id="цель-работы">Цель работы</h2>
<p>Знакомство с не реляционной документ-ориентированной СУБД MongoDB.</p>
<h2 id="задачи-работы">Задачи работы</h2>
<ol>
<li>Создать подключение к СУБД Mongodb,</li>
<li>Создать <strong>коллекцию</strong> документов.</li>
<li>Написать пример документа в формате <code>json</code> из заданной предметной области</li>
<li>Добавить в коллекцию четыре различных документа.</li>
<li>Вывести список документов в коллекции со всеми атрибутами, выполнив запрос к базе данных.</li>
<li>Вывести основные атрибуты части документов коллекции, удовлетворяющих некоторому условию (использовать условия «меньше», «больше»)</li>
</ol>
<h2 id="mongodb">1.  MongoDB</h2>
<p>MongoDB реализует новый подход к построению баз данных, где нет таблиц, схем, запросов SQL, внешних ключей и многих других вещей, которые присущи объектно-реляционным базам данных.</p>
<p>Со времен динозавров было обычным делом хранить все данные в реляционных базах данных (MS SQL, MySQL, Oracle, PostgresSQL). При этом было не столь важно, а подходят ли реляционные базы данных для хранения данного типа данных или нет.</p>
<p>В отличие от реляционных баз данных MongoDB предлагает документ-ориентированную модель данных, благодаря чему MongoDB работает быстрее, обладает лучшей масштабируемостью, ее легче использовать.</p>
<p>Но, даже учитывая все недостатки традиционных баз данных и достоинства MongoDB, важно понимать, что задачи бывают разные и методы их решения бывают разные. В какой-то ситуации MongoDB действительно улучшит производительность вашего приложения, например, если надо хранить сложные по структуре данные. В другой же ситуации лучше будет использовать традиционные реляционные базы данных. Кроме того, можно использовать смешенный подход: хранить один тип данных в MongoDB, а другой тип данных - в традиционных БД.</p>
<p>Вся система MongoDB может представлять не только одну базу данных, находящуюся на одном физическом сервере. Функциональность MongoDB позволяет расположить несколько баз данных на нескольких физических серверах, и эти базы данных смогут легко обмениваться данными и сохранять целостность.</p>
<h3 id="области-применения">Области применения</h3>
<p><a href="https://habr.com/ru/company/latera/blog/280196/">За и против: Когда стоит и не стоит использовать MongoDB</a><br>
<a href="https://qna.habr.com/q/475876">Для чего идеальна MongoDb? Примеры приложений, где MongoDB будет лучше mysql?</a><br>
<a href="https://mcs.mail.ru/blog/osobennosti-mongodb-kogda-baza-dannyh-vam-podhodit">В чем особенности MongoDB и когда эта база данных вам подходит: руководство для новичков</a></p>
<h3 id="формат-данных-в-mongodb">Формат данных в MongoDB</h3>
<p>Одним из популярных стандартов обмена данными и их хранения является JSON (JavaScript Object Notation). JSON эффективно описывает сложные по структуре данные. Способ хранения данных в MongoDB в этом плане похож на JSON, хотя формально JSON не используется. Для хранения в MongoDB применяется формат, который называется <strong>BSON</strong> (БиСон) или сокращение от binary JSON.</p>
<p>BSON позволяет работать с данными быстрее: быстрее выполняется поиск и обработка. Хотя надо отметить, что BSON в отличие от хранения данных в формате JSON имеет небольшой недостаток: в целом данные в JSON-формате занимают меньше места, чем в формате BSON, с другой стороны, данный недостаток с лихвой окупается скоростью.</p>
<h3 id="кроссплатформенность">Кроссплатформенность</h3>
<p>MongoDB написана на C++, поэтому ее легко портировать на самые разные платформы. MongoDB может быть развернута на платформах Windows, Linux, MacOS, Solaris. Можно также загрузить исходный код и самому скомпилировать MongoDB, но рекомендуется использовать библиотеки с офсайта.</p>
<h3 id="документы-вместо-строк">Документы вместо строк</h3>
<p>Если реляционные базы данных хранят строки, то MongoDB хранит документы. В отличие от строк документы могут хранить сложную по структуре информацию. Документ можно представить как хранилище ключей и значений.</p>
<p>Ключ представляет простую метку, с которым ассоциировано определенный кусок данных.</p>
<p>Однако при всех различиях есть одна особенность, которая сближает MongoDB и реляционные базы данных. В реляционных СУБД встречается такое понятие как первичный ключ. Это понятие описывает некий столбец, который имеет уникальные значения. В MongoDB для каждого документа имеется уникальный идентификатор, который называется <code>_id</code>. И если явным образом не указать его значение, то MongoDB автоматически сгенерирует для него значение.</p>
<p>Каждому ключу сопоставляется определенное значение. Но здесь также надо учитывать одну особенность: если в реляционных базах есть четко очерченная структура, где есть поля, и если какое-то поле не имеет значение, ему (в зависимости от настроек конкретной бд) можно присвоить значение <code>NULL</code>. В MongoDB все иначе. Если какому-то ключу не сопоставлено значение, то этот ключ просто опускается в документе и не употребляется.</p>
<h3 id="коллекции">Коллекции</h3>
<p>Если в традиционном мире SQL есть таблицы, то в мире MongoDB есть коллекции. И если в реляционных БД таблицы хранят однотипные жестко структурированные объекты, то в коллекции могут содержать самые разные объекты, имеющие различную структуру и различный набор свойств.</p>
<h3 id="репликация">Репликация</h3>
<p>Система хранения данных в MongoDB представляет набор реплик. В этом наборе есть основной узел, а также может быть набор вторичных узлов. Все вторичные узлы сохраняют целостность и автоматически обновляются вместе с обновлением главного узла. И если основной узел по каким-то причинам выходит из строя, то один из вторичных узлов становится главным.</p>
<h3 id="простота-в-использовании">Простота в использовании</h3>
<p>Отсутствие жесткой схемы базы данных и в связи с этим потребности при малейшем изменении концепции хранения данных пересоздавать эту схему значительно облегчают работу с базами данных MongoDB и дальнейшим их масштабированием. Кроме того, экономится время разработчиков. Им больше не надо думать о пересоздании базы данных и тратить время на построение сложных запросов.</p>
<h3 id="gridfs">GridFS</h3>
<p>Одной из проблем при работе с любыми системами баз данных является сохранение данных большого размера. Можно сохранять данные в файлах, используя различные языки программирования. Некоторые СУБД предлагают специальные типы данных для хранения бинарных данных в БД (например, BLOB в MySQL).</p>
<p>В отличие от реляционных СУБД MongoDB позволяет сохранять различные документы с различным набором данных, однако при этом размер документа ограничивается 16 мб. Но MongoDB предлагает решение - специальную технологию <strong>GridFS</strong>, которая позволяет хранить данные по размеру больше, чем 16 мб.</p>
<p>Система GridFS состоит из двух коллекций. В первой коллекции, которая называется <code>files</code>, хранятся имена файлов, а также их метаданные, например, размер. А в другой коллекции, которая называется <code>chunks</code>, в виде небольших сегментов хранятся данные файлов, обычно сегментами по 256 кб.</p>
<p>Для тестирования GridFS можно использовать специальную утилиту <strong>mongofiles</strong>, которая идет в пакете <code>mongodb</code>.</p>
<h2 id="работа-с-mongodb-в-виртуальном-рабочем-окружении">2. Работа с MongoDB в виртуальном рабочем окружении</h2>
<h3 id="работа-в-виртуальной-машине">Работа в виртуальной машине</h3>
<p>Ubuntu 16.04.6 LTS:</p>
<ul>
<li>логин <code>user</code>  и пароль <code>user</code></li>
</ul>
<h4 id="запуск-mongodb">Запуск MongoDB</h4>
<p>Запуск демона <a href="https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod" title="bin.mongod"><code>mongod</code></a>  выполняется с помощью команды:</p>
<pre class=" language-bash"><code class="prism  language-bash"><span class="token function">sudo</span> systemctl start mongod
</code></pre>
<p>Если возникают ошибки, подобные той, что приведена ниже, то обратитесь к документации <a href="https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod" title="bin.mongod"><code>mongod</code></a>:<br>
<code>Failed to start mongod.service: Unit mongod.service not found.</code></p>
<p><img src="https://user-images.githubusercontent.com/479988/97132416-afe52600-1768-11eb-8c50-b6e3a354ef9c.png" alt="изображение"></p>
<p>Перезапустите демона MongoDB:</p>
<pre class=" language-bash"><code class="prism  language-bash"><span class="token function">sudo</span> systemctl daemon-reload
</code></pre>
<p>и снова попытайтесь его запустить.</p>
<h4 id="проверка-что-демон-mongodb-успешно-запущен">Проверка, что демон MongoDB успешно запущен</h4>
<pre class=" language-bash"><code class="prism  language-bash"><span class="token function">sudo</span> systemctl status mongod
</code></pre>
<p>При желании вы можете убедиться, что MongoDB запустится после перезагрузки системы, выполнив следующую команду:</p>
<pre class=" language-bash"><code class="prism  language-bash"><span class="token function">sudo</span> systemctl <span class="token function">enable</span> mongod
</code></pre>
<h4 id="остановка-демона-mongodb">Остановка демона MongoDB</h4>
<p>Остановка <a href="https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod" title="bin.mongod"><code>mongod</code></a>  с помощью команды:</p>
<pre class=" language-bash"><code class="prism  language-bash"><span class="token function">sudo</span> systemctl stop mongod
</code></pre>
<h4 id="перезапуск-демона-mongodb">Перезапуск демона MongoDB</h4>
<p>Перезапуск демона  <a href="https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod" title="bin.mongod"><code>mongod</code></a> с помощью:</p>
<pre class=" language-bash"><code class="prism  language-bash"><span class="token function">sudo</span> systemctl restart mongod
</code></pre>
<p>Вы можете следить за состоянием процесса на предмет ошибок или важных сообщений, наблюдая за выводом в <code>/var/log/mongodb/mongod.log</code>  файле.</p>
<h4 id="запуск-командной-оболочки-mongodb">Запуск командной оболочки MongoDB</h4>
<p>Запуск <a href="https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo" title="bin.mongo"><code>mongo</code></a>  командной оболочки подобен запуску демона  <a href="https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod" title="bin.mongod"><code>mongod</code></a>. Можно запустить оболочку  <a href="https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo" title="bin.mongo"><code>mongo</code></a>  без параметров для подключения к демону  <a href="https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod" title="bin.mongod"><code>mongod</code></a>  который запущен на <code>localhost</code> с портом по-умолчанию 27017:</p>
<pre class=" language-bash"><code class="prism  language-bash">mongo
</code></pre>
<h3 id="создание-каталога-для-бд-и-запуск-mongodb">Создание каталога для БД и запуск MongoDB</h3>
<p>После установки надо создать на жестком диске каталог, в котором будут находиться базы данных MongoDB. В ОС Linux каталогом по умолчанию будет <code>/data/db</code>.</p>
<p>И после удачного запуска сервера мы сможем производить операции с БД через оболочку <code>mongo</code>. Эта оболочка представляет файл <code>mongo</code>. Запустим этот файл:</p>
<p><img src="https://user-images.githubusercontent.com/479988/97113599-513e8e80-170d-11eb-9487-072d013b1dde.png" alt="Запуск оболочки MongoDB"><br>
Это консольная оболочка для взаимодействия с сервером, через которую можно управлять данными.</p>
<p>Теперь произведем какие-либо простейшие действия. Введем в <code>mongo</code> последовательно следующие команды и после каждой команды нажмем на <code>Enter</code>:</p>
<pre class=" language-bash"><code class="prism  language-bash">use <span class="token function">test</span>
db.users.save<span class="token punctuation">(</span> <span class="token punctuation">{</span> name: <span class="token string">"Tom"</span><span class="token punctuation">}</span> <span class="token punctuation">)</span>
db.users.find<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre>
<p>Первая команда <code>use test</code> устанавливает в качестве используемой базу данных <code>test</code>. Даже если такой БД нет, то она создается автоматически. И далее <code>db</code> будет представлять текущую базу данных – то есть базу данных <code>test</code>.<br>
После <code>db</code> идет <code>users</code> – это коллекция, в которую затем мы добавляем новый объект. Если в SQL нам надо создавать таблицы заранее, то коллекции MongoDB создает самостоятельно при их отсутствии.</p>
<p>С помощью метода <code>db.users.save()</code> в коллекцию <code>users</code> базы данных <code>test</code> добавляется объект <code>{ name: "Tom" }</code>. Описание добавляемого объекта определяется в формате JSON. То есть в данном случае у объекта определен один ключ “name”, которому сопоставляется значение “Tom”. То есть мы добавляем пользователя с именем Tom.</p>
<p>Если объект был успешно добавлен, то консоль выведет результат в виде выражения <code>WriteResult({ "nInserted" : 1 })</code>.</p>
<p>А третья команда <code>db.users.find()</code> выводит на экран все объекты из БД <code>test</code>.</p>
<p><img src="https://user-images.githubusercontent.com/479988/97113828-96af8b80-170e-11eb-9abf-b3ba7e418b0f.png" alt="Добавление в бд MongoDB"><br>
MongoDB в качестве уникальных идентификаторов документа использует поле <code>_id</code>. И в данном случае <code>ObjectId</code> как раз и представляет значение для идентификатора <code>_id</code>.</p>
<h3 id="графический-клиент-compass">Графический клиент Compass</h3>
<p>Для работы с MongoDB можно использовать официальный графический клиент Compass.</p>
<p><img src="https://user-images.githubusercontent.com/479988/97113882-032a8a80-170f-11eb-849a-e636dd425f9a.png" alt="изображение"><br>
<img src="https://user-images.githubusercontent.com/479988/97113899-10e01000-170f-11eb-93a6-ef79a9ab0cd0.png" alt="изображение"></p>
<p>При запуске программы нам надо ввести ряд данных, чтобы подключиться к серверу.</p>
<ul>
<li>
<p>Hostname: хост сервера</p>
</li>
<li>
<p>Port: порт, по которому запущен сервер</p>
</li>
<li>
<p>SRV Record: спецификация, которая определяет расположение сервера (например, адрес и порт).</p>
</li>
<li>
<p>Authentication: тип применяемой аутентификации. Здеь есть следующие опции:</p>
<ul>
<li>
<p>None</p>
</li>
<li>
<p>Username / Password</p>
</li>
<li>
<p>X.509</p>
</li>
<li>
<p>Kerberos</p>
</li>
<li>
<p>LDAP</p>
</li>
</ul>
</li>
<li>
<p>Replica Set Name: название реплики MongoDB, к которой происходит подключение</p>
</li>
<li>
<p>Read Preference: определяет, как Compass управляет операциями чтения. Может принимать следующие опции: Primary, Primary Preferred, Secondary, Secondary Preferred и Nearest.</p>
</li>
<li>
<p>SSL: указывает, будет ли использоваться защищенное подключение</p>
</li>
<li>
<p>SSH tunnel: следует ли подключаться к кластеру MongoDB через туннель SSH</p>
</li>
<li>
<p>Favorite Name: устанавливает имя подключения</p>
</li>
</ul>
<p>Например, подключимся к локальному серверу. Для этого вначале запустим сам сервер MongoDB. В Compass оставим все настройки подключения по умолчанию (они как раз нацелены на локальный сервер, который запускается по адресу <code>localhost:27017</code>) и для подключения нажмем на кнопку Connect.</p>
<p>После этого нам откроется список баз данных, которые есть на сервере:</p>
<p><img src="https://user-images.githubusercontent.com/479988/97113928-3a993700-170f-11eb-8b83-94790443fb7c.png" alt="изображение"></p>
<p>Мы можем выбрать определенную базу данных и получить по нему информацию, в частности, увидеть набор коллекций в БД, сколько они занимают данных.</p>
<p><img src="https://metanit.com/nosql/mongodb/pics/compass6.png" alt="Коллекции в БД в MongoDB"></p>
<p>Нажав на определенную коллекцию, можно увидеть графически все данные, которые есть в коллекции:</p>
<p><img src="https://user-images.githubusercontent.com/479988/97113943-57ce0580-170f-11eb-8ad2-0d434ff52d6b.png" alt="изображение"></p>
<p>Используя графический интерфейс программы Compass, мы можем управлять этими данными, добавлять, изменять, удалять их.</p>
<h2 id="работа-с-базой-данных">3. Работа с базой данных</h2>
<h3 id="устройство-базы-данных.-документы">Устройство базы данных. Документы</h3>
<p>Всю модель устройства базы данных в MongoDB можно представить следующим образом:</p>
<p><img src="https://metanit.com/nosql/mongodb/pics/2.1.png" alt="Организация базы данных в MongoDB"></p>
<p>Если в реляционных БД содержимое составляют таблицы, то в <code>mongodb</code> база данных состоит из коллекций.</p>
<p>Каждая коллекция имеет свое уникальное имя – произвольный идентификатор, состоящий из не более чем 128 различных алфавитно-цифровых символов и знака подчеркивания.</p>
<p>В отличие от реляционных баз данных MongoDB не использует табличное устройство с четко заданным количеством столбцов и типов данных. MongoDB является документ-ориентированной системой, в которой центральным понятием является документ.</p>
<p>Документ можно представить как объект, хранящий некоторую информацию. В некотором смысле он подобен строкам в реляционных СУБД, где строки хранят информацию об отдельном элементе. Например, типичный документ:</p>
<pre class=" language-json"><code class="prism  language-json"><span class="token punctuation">{</span>
	<span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"Bill"</span><span class="token punctuation">,</span>
	<span class="token string">"surname"</span><span class="token punctuation">:</span> <span class="token string">"Gates"</span><span class="token punctuation">,</span>
	<span class="token string">"age"</span><span class="token punctuation">:</span> <span class="token string">"48"</span><span class="token punctuation">,</span>
	<span class="token string">"company"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
		<span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"microsoft"</span><span class="token punctuation">,</span>
		<span class="token string">"year"</span><span class="token punctuation">:</span> <span class="token string">"1974"</span><span class="token punctuation">,</span>
		<span class="token string">"price"</span><span class="token punctuation">:</span> <span class="token string">"300000"</span>
		<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
<p>Документ представляет набор пар ключ-значение. Например, в выражении <code>"name": "Bill"</code> представляет ключ, а <code>Bill</code> – значение.</p>
<p>Ключи представляют строки. Значения же могут различаться по типу данных. В данном случае у нас почти все значения также представляют строковый тип, и лишь один ключ (<code>company</code>) ссылается на отдельный объект. Всего имеется следующие типы значений:</p>
<ul>
<li>
<p>String: строковый тип данных, как в приведенном выше примере (для строк используется кодировка UTF-8)</p>
</li>
<li>
<p>Array (массив): тип данных для хранения массивов элементов</p>
</li>
<li>
<p>Binary data (двоичные данные): тип для хранения данных в бинарном формате</p>
</li>
<li>
<p>Boolean: булевый тип данных, хранящий логические значения <code>TRUE</code> или <code>FALSE</code>, например, <code>{"married": FALSE}</code></p>
</li>
<li>
<p>Date: хранит дату в формате времени UNIX</p>
</li>
<li>
<p>Double: числовой тип данных для хранения чисел с плавающей точкой</p>
</li>
<li>
<p>Integer: используется для хранения целочисленных значений, например, <code>{"age": 29}</code></p>
</li>
<li>
<p>JavaScript: тип данных для хранения кода <code>javascript</code></p>
</li>
<li>
<p>Min key/Max key: используются для сравнения значений с наименьшим/наибольшим элементов BSON</p>
</li>
<li>
<p>Null: тип данных для хранения значения <code>Null</code></p>
</li>
<li>
<p>Object: строковый тип данных, как в приведенном выше примере</p>
</li>
<li>
<p>ObjectID: тип данных для хранения id документа</p>
</li>
<li>
<p>Regular expression: применяется для хранения регулярных выражений</p>
</li>
<li>
<p>Symbol: тип данных, идентичный строковому. Используется преимущественно для тех языков, в которых есть специальные символы.</p>
</li>
<li>
<p>Timestamp: применяется для хранения времени</p>
</li>
</ul>
<p>В отличие от строк документы могут содержать разнородную информацию. Так, рядом с документом, описанным выше, в одной коллекции может находиться другой объект, например:</p>
<pre class=" language-json"><code class="prism  language-json"><span class="token punctuation">{</span>
<span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"Tom"</span><span class="token punctuation">,</span>
<span class="token string">"birthday"</span><span class="token punctuation">:</span> <span class="token string">"1985.06.28"</span><span class="token punctuation">,</span>
<span class="token string">"place"</span><span class="token punctuation">:</span> <span class="token string">"Berlin"</span><span class="token punctuation">,</span>
<span class="token string">"languages"</span><span class="token punctuation">:</span><span class="token punctuation">[</span>
	<span class="token string">"english"</span><span class="token punctuation">,</span>
	<span class="token string">"german"</span><span class="token punctuation">,</span>
	<span class="token string">"spanish"</span>
	<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre>
<p>Казалось бы разные объекты за исключением отдельных свойств, но все они могут находиться в одной коллекции.</p>
<p>Еще пара важных замечаний: в MongoDB запросы обладают регистрозависимостью и строгой типизацией. То есть следующие два документа не будут идентичны:</p>
<pre class=" language-json"><code class="prism  language-json"><span class="token punctuation">{</span><span class="token string">"age"</span><span class="token punctuation">:</span> <span class="token string">"28"</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">"age"</span><span class="token punctuation">:</span> <span class="token number">28</span><span class="token punctuation">}</span>
</code></pre>
<p>Если в первом случае для ключа <code>age</code> определена в качестве значения строка, то во втором случае значением является число.</p>
<h3 id="идентификатор-документа">Идентификатор документа</h3>
<p>Для каждого документа в MongoDB определен уникальный идентификатор, который называется <code>_id</code>. При добавлении документа в коллекцию данный идентификатор создается автоматически. Однако разработчик может сам явным образом задать идентификатор, а не полагаться на автоматически генерируемые, указав соответствующий ключ и его значение в документе.</p>
<p>Данное поле должно иметь уникальное значение в рамках коллекции. И если мы попробуем добавить в коллекцию два документа с одинаковым идентификатором, то добавится только один из них, а при добавлении второго мы получим ошибку.</p>
<p>Если идентификатор не задан явно, то MongoDB создает специальное бинарное значение размером 12 байт. Это значение состоит из нескольких сегментов: значение типа <code>timestamp</code> размером 4 байта, идентификатор машины из 3 байт, идентификатор процесса из 2 байт и счетчик из 3 байт. Таким образом, первые 9 байт гарантируют уникальность среди других машин, на которых могут быть реплики базы данных. А следующие 3 байта гарантируют уникальность в течение одной секунды для одного процесса. Такая модель построения идентификатора гарантирует с высокой долей вероятности, что он будет иметь уникальное значение, ведь она позволяет создавать до 16 777 216 уникальных объектов ObjectId в секунду для одного процесса.</p>
<h3 id="добавление-данных">Добавление данных</h3>
<p>Начиная работать с MongoDB, первым делом надо установить нужную нам базу данных в качестве текущей, чтобы затем ее использовать. Для этого надо использовать команду <code>use</code>, после которой идет название базы данных. При этом не важно, существует ли такая БД или нет. Если ее нет, то MongoDB автоматически создаст ее при добавлении в нее данных. Например, запустим <code>mongo</code> и введем там следующую команду:</p>
<pre class=" language-bash"><code class="prism  language-bash"><span class="token operator">&gt;</span> use info
</code></pre>
<p><img src="https://user-images.githubusercontent.com/479988/97114118-6668ec80-1710-11eb-9944-356e9611ee1e.png" alt="изображение"><br>
Теперь в качестве текущей будет установлена БД <code>info</code>.</p>
<p>Если вы вдруг не уверены, а существует ли уже база данных с таким названием, то с помощью команды <code>show dbs</code> можно вывести названия всех имеющихся БД на консоль:</p>
<p><img src="https://user-images.githubusercontent.com/479988/97114140-89939c00-1710-11eb-9bdd-4c7ce141ac54.png" alt="изображение"><br>
Для базы данных можно задать любое имя, однако есть некоторые ограничения. Например, в имени не должно быть символов <code>/, \, ., ", *, &lt;, &gt;, :, |, ?, $</code>. Кроме того, имена баз данных ограничены 64 байтами.</p>
<p>Также есть зарезервированные имена, которые нельзя использовать: <code>local</code>, <code>admin</code>, <code>config</code>.</p>
<p>Причем как вы видите, БД <code>info</code> в данном списке нет, так как мы в нее еще не добавили данные.</p>
<p>Если мы хотим узнать, какая БД используется в текущей момент, то мы можем воспользоваться командой <code>db</code>:</p>
<pre class=" language-bash"><code class="prism  language-bash"><span class="token operator">&gt;</span> db
info
</code></pre>
<p>Кроме баз данных мы можем просмотреть список всех коллекций в текущей БД с помощью команды <code>show collections</code>. Но так как БД <code>info</code>, которая указана текущей, еще не существует, то и коллекций она пока не содержит.</p>
<h3 id="получение-статистики">Получение статистики</h3>
<p>Используя команду <code>db.stats()</code>, можно получить статистику по текущей базе данных. Например, у нас в качестве текущей установлена база данных <code>test</code>:</p>
<p><img src="https://user-images.githubusercontent.com/479988/97114165-ae880f00-1710-11eb-9f02-44c18d2ea57c.png" alt="изображение"><br>
Похожим образом мы можем узнать всю статистику по отдельной коллекции. Например, узнаем статистику по коллекции users: <code>db.users.stats()</code></p>
<h3 id="добавление-данных-1">Добавление данных</h3>
<p>Установив БД, теперь мы можем добавить в нее данные. Все данные хранятся в БД в формате BSON, который близок к JSON, поэтому нам надо также вводить данные в этом формате. И хотя у нас, возможно, на данный момент нет ни одной коллекции, но при добавлении в нее данных она автоматически создается.</p>
<p>Как ранее говорилось, имя коллекции – произвольный идентификатор, состоящий из не более чем 128 различных алфавитно-цифровых символов и знака подчеркивания. В то же время имя коллекции не должно начинаться с префикса <code>system.</code>, так как он зарезервирован для внутренних коллекций (например, коллекция <code>system.users</code> содержит всех пользователей базы данных). И также имя не должно содержать знака доллара – <code>$</code>.</p>
<p>Для добавления в коллекцию могут использоваться три ее метода:</p>
<ul>
<li>
<p><code>insertOne()</code>: добавляет один документ</p>
</li>
<li>
<p><code>insertMany()</code>: добавляет несколько документов</p>
</li>
<li>
<p><code>insert()</code>: может добавлять как один, так и несколько документов</p>
</li>
</ul>
<p>Итак, добавим один документ:</p>
<pre class=" language-bash"><code class="prism  language-bash"><span class="token operator">&gt;</span> db.users.insert<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"name"</span><span class="token keyword">:</span><span class="token string">"Tom"</span>,<span class="token string">"age"</span>:28,languages:<span class="token punctuation">[</span><span class="token string">"english"</span>,<span class="token string">"spanish"</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
<p>Документ представляет набор пар ключ-значение. В данном случае добавляемый документ имеет три ключа: <code>name</code>, <code>age</code>, <code>languages</code>, и каждому из них сопоставляет определенное значение. Например, ключу <code>languages</code> в качестве значения сопоставляется массив.</p>
<p>Некоторые ограничения при использовании имен ключей:</p>
<ul>
<li>
<p>Символ <code>$</code> не может быть первым символом в имени ключа</p>
</li>
<li>
<p>Имя ключа не может содержать символ точки <code>.</code></p>
</li>
</ul>
<p>При добавлении данных, если мы явным образом не предоставили значение для поля <code>_id</code> (то есть уникального идентификатора документа), то оно генерируется автоматически. Но в принципе мы можем сами установить этот идентификатор при добавлении данных:</p>
<pre class=" language-bash"><code class="prism  language-bash"><span class="token operator">&gt;</span> db.users.insert<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"_id"</span><span class="token keyword">:</span> 123457, <span class="token string">"name"</span><span class="token keyword">:</span> <span class="token string">"Tom"</span>, <span class="token string">"age"</span><span class="token keyword">:</span> 28, languages: <span class="token punctuation">[</span><span class="token string">"english"</span>, <span class="token string">"spanish"</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
<p>Стоит отметить, что названия ключей могут использоваться в кавычках, а могут и без кавычек.<br>
В случае удачного добавления на консоль будет выведен идентификатор добавленного документа.<br>
И чтобы убедиться, что документ в БД, мы его выводим функцией <code>find</code>.</p>
<pre class=" language-bash"><code class="prism  language-bash"><span class="token operator">&gt;</span> db.users.find<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre>
<p><img src="https://user-images.githubusercontent.com/479988/97116718-dda67c80-1720-11eb-81f1-b813fe7da74d.png" alt="изображение"></p>
<p>Чтобы вывести в более читабельном виде добавим метод <code>pretty()</code>:</p>
<pre class=" language-bash"><code class="prism  language-bash"><span class="token variable"><span class="token variable">`</span><span class="token operator">&gt;</span> db.users.find<span class="token punctuation">(</span><span class="token punctuation">)</span>.pretty<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token variable">`</span></span>
</code></pre>
<p>Если надо добавить ряд документов, то мы можем воспользоваться:</p>
<pre class=" language-bash"><code class="prism  language-bash"><span class="token operator">&gt;</span> db.users.insert<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"name"</span><span class="token keyword">:</span> <span class="token string">"Bob"</span>, <span class="token string">"age"</span><span class="token keyword">:</span> 26,  languages: <span class="token punctuation">[</span><span class="token string">"english"</span>, <span class="token string">"frensh"</span><span class="token punctuation">]</span><span class="token punctuation">}</span>, <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token keyword">:</span> <span class="token string">"Alice"</span>, <span class="token string">"age"</span><span class="token keyword">:</span> 31, languages:<span class="token punctuation">[</span><span class="token string">"german"</span>, <span class="token string">"english"</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre>
<p>После добавления консоль выводит идентификаторы добавленных документов:</p>
<p><img src="https://user-images.githubusercontent.com/479988/97117002-e435f380-1722-11eb-919e-a69ff913a86b.png" alt="изображение"></p>
<p>И третий метод - insert() демонстрирует более универсальный способ добавления документов. При его вызове в него также передается добавляемый документ:</p>
<pre class=" language-bash"><code class="prism  language-bash"><span class="token operator">&gt;</span> db.users.insert<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"name"</span><span class="token keyword">:</span> <span class="token string">"Tom"</span>, <span class="token string">"age"</span><span class="token keyword">:</span> 28, languages: <span class="token punctuation">[</span><span class="token string">"english"</span>, <span class="token string">"spanish"</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
<p>После его вызова на консоль выводится количество добавленных записей:</p>
<pre class=" language-bash"><code class="prism  language-bash">WriteResult<span class="token punctuation">(</span><span class="token string">"nInserte"</span><span class="token keyword">:</span> 1 <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
<p>Есть еще один способ добавления в БД документа, который включает два этапа: определение документа (<code>document = ( { ... } )</code>) и собственно его добавление:</p>
<blockquote>
<p>document=({“name”: “Bill”, “age”: 32, languages: [“english”, “french”]})<br>
db.users.insert(document)</p>
</blockquote>
<p>При желании опять же можно с помощью функции <code>db.users.find()</code> убедиться, что документ попал в БД.</p>
<h3 id="загрузка-данных-из-файла">Загрузка данных из файла</h3>
<p>Данные для базы данных <code>mongodb</code> можно определять в обычном текстовом файле, что довольно удобно, поскольку мы можем переносить или пересылать этот файл независимо от базы данных <code>mongodb</code>. Например, определим где-нибудь на жестком диске файл <code>users.js</code> со следующим содержимым:</p>
<blockquote>
<p>db.users.insert([<br>
{“name”: “Alice”, “age”: 31, languages: [“english”, “french”]},<br>
{“name”:“Lene”, “age”: 29, languages: [“english”, “spanish”]},<br>
{“name”: “Kate”,  “age”: 30, languages: [“german”, “russian”]}<br>
])</p>
</blockquote>
<p>То есть здесь с помощью метода <code>insert</code> добавляются три документа в коллекцию <code>users</code>.</p>
<p>Для загрузки файла в текущую базу данных применяется функция <code>load()</code>, в которую в качестве параметра передается путь к файлу:</p>
<blockquote>
<p>load(“users.js”)</p>
</blockquote>
<p>Наиболее простой способом получения содержимого БД представляет использование функции <code>find</code>. Действие этой функции во многом аналогично обычному запросу <code>SELECT * FROM Table</code>, который извлекает все строки. Например, чтобы извлечь все документы из коллекции <code>users</code>, созданной в прошлой теме, мы можем использовать команду <code>db.users.find()</code>.</p>
<p>Для вывода документов в более удобном наглядном представлении мы можем добавить вызов метода <code>pretty()</code>:</p>
<blockquote>
<p>db.users.find().pretty()</p>
</blockquote>
<p><img src="https://user-images.githubusercontent.com/479988/97117325-bce02600-1724-11eb-8b75-a00bf3343062.png" alt="изображение"></p>
<p>Однако что, если нам надо получить не все документы, а только те, которые удовлетворяют определенному требованию.  Выведем все документы, в которых <code>name=Tom</code>:</p>
<blockquote>
<p>db.users.find({name: “Tom”})</p>
</blockquote>
<p>Такой запрос выведет нам два документа, в которых name=Tom.<br>
<img src="https://user-images.githubusercontent.com/479988/97117338-d2ede680-1724-11eb-986d-19fe009a5b6e.png" alt="изображение"><br>
Теперь более сложный запрос: нам надо вывести те объекты, у которых <code>name=Tom</code> и одновременно <code>age=28</code>. То есть на языке SQL это могло бы выглядеть так: <code>SELECT * FROM Table WHERE Name='Tom' AND Age=28</code>. Данному критерию у нас соответствует последний добавленный объект. Тогда мы можем написать следующий запрос:</p>
<blockquote>
<p>db.users.find({name: “Tom” , age: 28})</p>
</blockquote>
<p><img src="https://user-images.githubusercontent.com/479988/97117366-0c265680-1725-11eb-85c0-62ed92b39001.png" alt="изображение"></p>
<p>Также несложно отыскать по элементу в массиве. Например, следующий запрос выводит все документы, у которых в массиве <code>languages</code> есть <code>english</code>:</p>
<blockquote>
<p>db.users.find({languages: “english”})</p>
</blockquote>
<p>Усложним запрос и получим те документы, у которых в массиве <code>languages</code> одновременно два языка: “english” и “german”:</p>
<blockquote>
<p>db.users.find({languages: [“english”, “german”]})</p>
</blockquote>
<p>Теперь выведем все документы, в которых “english” в массиве <code>languages</code> находится на первом месте:</p>
<blockquote>
<p>db.users.find({“languages.0”: “english”})</p>
</blockquote>
<p>Соответственно если нам надо вывести документы, где <code>english</code> на втором месте (например, <code>["german", "english"]</code>), то вместо нуля ставим единицу: <code>languages.1</code>.</p>
<h3 id="проекция">Проекция</h3>
<p>Документ может иметь множество полей, но не все эти поля нам могут быть нужны и важны при запросе. И в этом случае мы можем включить в выборку только нужные поля, использовав проекцию. Например, выведем только порцию информации, например, значения полей “age” у все документов, в которых <code>name=Tom</code>:</p>
<blockquote>
<p>db.users.find({name: “Tom”}, {age: 1})</p>
</blockquote>
<p>Использование единицы в качестве параметра <code>{age: 1}</code> указывает, что запрос должен вернуть только содержание свойства <code>age</code>.<br>
<img src="https://user-images.githubusercontent.com/479988/97117406-67584900-1725-11eb-824c-39e999280428.png" alt="изображение"></p>
<p>И обратная ситуация: мы хотим найти все поля документа кроме свойства age. В этом случае в качестве параметра указываем 0:</p>
<blockquote>
<p>db.persons.find({name: “Tom”}, {age: 0})</p>
</blockquote>
<p>При этом надо учитывать, что даже если мы отметим, что мы хотим получить только поле name, поле _id также будет включено в результирующую выборку. Поэтому, если мы не хотим видеть данное поле в выборке, то надо явным образом указать: <code>{"_id":0}</code></p>
<p>Альтернативно вместо 1 и 0 можно использовать <code>true</code> и <code>false</code>:</p>
<blockquote>
<p>db.users.find({name:<code></code>“Tom”``}, {age: true, _id: false})</p>
</blockquote>
<p>Если мы не хотим при этом конкретизировать выборку, а хотим вывести все документы, то можно оставить первые фигурные скобки пустыми:</p>
<blockquote>
<p>db.users.find({}, {age: 1, _id: 0})</p>
</blockquote>
<h3 id="запрос-к-вложенным-объектам">Запрос к вложенным объектам</h3>
<p>Предыдущие запросы применялись к простым объектам. Но документы могут быть очень сложными по структуре. Например, добавим в коллекцию <code>persons</code> следующий документ:</p>
<blockquote>
<p>db.users.insert({“name”: “Alex”, “age”: 28, company: {“name”: “microsoft”, “country”: “USA”}})</p>
</blockquote>
<p>Здесь определяется вложенный объект с ключом <code>company</code>. И чтобы найти все документы, у которых в ключе <code>company</code> вложенное свойство <code>name=microsoft</code>, нам надо использовать оператор точку:</p>
<blockquote>
<p>db.users.find({“<a href="http://company.name">company.name</a>”: “microsoft”})</p>
</blockquote>
<h3 id="настройка-запросов-и-сортировка">Настройка запросов и сортировка</h3>
<p>MongoDB представляет ряд функций, которые помогают управлять выборкой из БД. Одна из них – функция <code>limit</code>. Она задает максимально допустимое количество получаемых документов. Количество передается в виде числового параметра. Например, ограничим выборку тремя документами:</p>
<blockquote>
<p>db.users.find().limit(3)</p>
</blockquote>
<p>В данном случае мы получим первые три документа (если в коллекции 3 и больше документов). Но что, если мы хотим произвести выборку не сначала, а пропустив какое-то количество документов? В этом нам поможет функция <code>skip</code>. Например, пропустим первые три записи:</p>
<blockquote>
<p>db.users.find().skip(3)</p>
</blockquote>
<p>MongoDB предоставляет возможности отсортировать полученный из БД набор данных с помощью функции <code>sort</code>. Передавая в эту функцию значения 1 или -1, мы можем указать в каком порядке сортировать: по возрастанию (1) или по убыванию (-1). Во многом эта функция по действию аналогична выражению <code>ORDER BY</code> в SQL. Например, сортировка по возрастанию по полю <code>name</code>:</p>
<blockquote>
<p>db.users.find().sort({name: 1})</p>
</blockquote>
<p>Ну и в конце надо отметить, что мы можем совмещать все эти функции в одной цепочке:</p>
<blockquote>
<p>db.users.find().sort({name: 1}).skip(3).limit(3)</p>
</blockquote>
<h3 id="поиск-одиночного-документа">Поиск одиночного документа</h3>
<p>Если все документы извлекаются функцией <code>find</code>, то одиночный документ извлекается функцией <code>findOne</code>. Ее действие аналогично тому, как если бы мы использовали функцию <code>limit(1)</code>, которая также извлекает первый документ коллекции. А комбинация функций <code>skip</code> и <code>limit</code> извлечет документ по нужному местоположению.</p>
<h3 id="параметр-natural">Параметр $natural</h3>
<p>Если вдруг нам надо отсортировать ограниченную коллекцию, то мы можем воспользоваться параметром <code>$natural</code>. Этот параметр позволяет задать сортировку: документы передаются в том порядке, в каком они были добавлены в коллекцию, либо в обратном порядке.</p>
<p>Например, отберем последние пять документов:</p>
<blockquote>
<p>db.users.find().sort({ $natural: -1 }).limit(5)</p>
</blockquote>
<h3 id="оператор-slice">Оператор $slice</h3>
<p>$slice является в некотором роде комбинацией функций <code>limit</code> и <code>skip</code>. Но в отличие от них $slice может работать с массивами.</p>
<p>Оператор <code>$slice</code> принимает два параметра. Первый параметр указывает на общее количество возвращаемых документов. Второй параметр необязательный, но если он используется, тогда первый параметр указывает на смещение относительно начала (как функция <code>skip</code>), а второй – на ограничение количества извлекаемых документов.</p>
<p>Например, в каждом документе определен массив <code>languages</code> для хранения языков, на которых говорит человек. Их может быть и 1, и 2, и 3 и более. И допустим, ранее мы добавили следующий объект:</p>
<blockquote>
<p>db.users.insert({“name”: “Tom”, “age”: “32”, languages: [“english”, “german”]})</p>
</blockquote>
<p>И мы хотим при выводе документов сделать так, чтобы в выборку попадал только один язык из массива <code>languages</code>, а не весь массив:</p>
<blockquote>
<p>db.users.find ({name: “Tom”}, {languages: {$slice : 1}})</p>
</blockquote>
<p>Данный запрос при извлечении документа оставит в результате только первый язык из массива <code>languages</code>, то есть в данном случае <code>english</code>.</p>
<p>Обратная ситуация: нам надо оставить в массиве также один элемент, но не с начала, а с конца. В этом случае необходимо передать в параметр отрицательное значение:</p>
<blockquote>
<p>db.users.find ({name: “Tom”}, {languages: {$slice : -1}});</p>
</blockquote>
<p>Теперь в массиве окажется <code>german</code>, так как он первый с конца в добавленном элементе.</p>
<p>Используем сразу два параметра:</p>
<blockquote>
<p>db.users.find ({name: “Tom”}, {languages: {$slice : [-1, 1]}});</p>
</blockquote>
<p>Первый параметр говорит начать выборку элементов с конца (так как отрицательное значение), а второй параметр указывает на количество возвращаемых элементов массива. В итоге в массиве <code>language</code> окажется “german”</p>
<h2 id="команды-группировки">4. Команды группировки</h2>
<p>Отдельно стоит рассмотреть команды группировки: <code>count, group, distinct</code>.</p>
<h3 id="число-элементов-в-коллекции">Число элементов в коллекции</h3>
<p>С помощью функции <code>count()</code> можно получить число элементов в коллекции:</p>
<blockquote>
<p>db.users.count()</p>
</blockquote>
<p>Можно группировать параметры поиска и функцию <code>count</code>, чтобы подсчитать, сколько определенных документов, например, у которых <code>name=Tom</code>:</p>
<blockquote>
<p>db.users.find({name: “Tom”}).count()</p>
</blockquote>
<p>Более того мы можем создавать цепочки функций, чтобы конкретизировать условия подсчета:</p>
<blockquote>
<p>db.users.find({name:<code></code>“Tom”}).skip(2).count(true)</p>
</blockquote>
<p>Здесь надо отметить, что по умолчанию функция <code>count</code> не используется с функциями <code>limit</code> и <code>skip</code>. Чтобы их использовать, как в примере выше, в функцию <code>count</code> надо передать булевое значение <code>true</code></p>
<h3 id="функция-distinct">Функция distinct</h3>
<p>В коллекции могут быть документы, которые содержат одинаковые значения для одного или нескольких полей. Например, в нескольких документах определено <code>name: "Tom"</code>. И нам надо найти только уникальные различающиеся значения для одного из полей документа. Для этого мы можем воспользоваться функцией distinct:</p>
<blockquote>
<p>db.users.distinct(“name”)</p>
</blockquote>
<p>Здесь запрашиваются только уникальные значения для поля <code>name</code>. И на следующей строке консоль выводит в виде массива найденные уникальные значения.</p>
<h3 id="группировка-и-метод-group">Группировка и метод group</h3>
<p>Использование метода <code>group</code> аналогично применению выражения <code>GROUP BY</code> в SQL. Метод <code>group</code> принимает три параметра:</p>
<ul>
<li>
<p>key: указывает на ключ, по которому надо проводить группировку</p>
</li>
<li>
<p>initial: инициализирует поля документа, который будет представлять группу документов</p>
</li>
<li>
<p>reduce: представляет функцию, возвращающую количество элементов. Эта функция принимает в качестве аргументов два параметра: текущий элемент и агрегатный результирующий документ для текущей группы</p>
</li>
<li>
<p>keyf: необязательный параметр. Используется вместо параметра key и представляет функцию, которая возвращает объект key</p>
</li>
<li>
<p>cond: необязательный параметр. Представляет собой условие, которое должно возвращать true, иначе документ не примет участия в группировке. Если данный параметр неуказан, то в группировке участвуют все документы</p>
</li>
<li>
<p>finalize: необязательный параметр. Представляет функцию, которая срабатывает перед тем, как будут возвращены результаты группировки.</p>
</li>
</ul>
<h3 id="условные-операторы">Условные операторы</h3>
<p>Условные операторы задают условие, которому должно соответствовать значение поля документа:</p>
<ul>
<li>
<p>$eq (равно)</p>
</li>
<li>
<p>$ne (не равно)</p>
</li>
<li>
<p>$gt (больше чем)</p>
</li>
<li>
<p>$lt (меньше чем)</p>
</li>
<li>
<p>$gte (больше или равно)</p>
</li>
<li>
<p>$lte (меньше или равно)</p>
</li>
<li>
<p>$in определяет массив значений, одно из которых должно иметь поле документа</p>
</li>
<li>
<p>$nin определяет массив значений, которые не должно иметь поле документа</p>
</li>
</ul>
<p>Например, найдем все документы, у которых значение ключа <code>age</code> меньше 30:</p>
<blockquote>
<p>db.users.find ({age: {$lt : 30}})</p>
</blockquote>
<p>Аналогично будет использование других операторов сравнения. Например, тот же ключ, только больше 30:</p>
<blockquote>
<p>db.users.find ({age: {$gt : 30}})</p>
</blockquote>
<p>Обратите внимание, что сравнение здесь проводится над целочисленными типами, а не строками. Если ключ <code>age</code> представляет строковые значения, то соответственно надо проводить сравнение над строками: <code>db.users.find ({age: {$gt : "30"}})</code>, однако результат будет тем же.</p>
<p>Но представим ситуацию, когда нам надо найти все объекты со значением поля <code>age</code> больше 30, но меньше 50. В этом случае мы можем комбинировать два оператора:</p>
<blockquote>
<p>db.users.find ({age: {$gt : 30, $lt: 50}})</p>
</blockquote>
<p>Найдем пользователей, возраст которых равен 22:</p>
<blockquote>
<p>db.users.find ({age: {$eq : 22}})</p>
</blockquote>
<p>По сути это аналогия следующего запроса:</p>
<blockquote>
<p>db.users.find ({age: 22})</p>
</blockquote>
<p>Обратная операция – найдем пользователей, возраст которых НЕ равен 22:</p>
<blockquote>
<p>db.users.find ({age: {$ne : 22}})</p>
</blockquote>
<p>Оператор $in определяет массив возможных выражений и ищет те ключи, значение которых имеется в массиве:</p>
<blockquote>
<p>db.users.find ({age: {$in: [22, 32]}})</p>
</blockquote>
<p>Противоположным образом действует оператор $nin – он определяет массив возможных выражений и ищет те ключи, значение которых отсутствует в этом массиве:</p>
<blockquote>
<p>db.users.find ({age: {$nin : [22, 32]}})</p>
</blockquote>
<h3 id="логические-операторы">Логические операторы</h3>
<p>Логические операторы выполняются над условиями выборки:</p>
<ul>
<li>
<p>$or: соединяет два условия, и документ должен соответствовать одному из этих условий</p>
</li>
<li>
<p>$and: соединяет два условия, и документ должен соответствовать обоим условиям</p>
</li>
<li>
<p>$not: документ должен НЕ соответствовать условию</p>
</li>
<li>
<p>$nor: соединяет два условия, и документ должен НЕ соответствовать обоим условиям</p>
</li>
</ul>
<h4 id="оператор-or">Оператор $or</h4>
<p>Оператор $or представляет логическую операцию ИЛИ и определяет набор пар ключ-значение, которые должны иметься в документе. И если документ имеет хоть одну такую пару ключ-значение, то он соответствует данному запросу и извлекается из БД:</p>
<p><code>&gt; db.users.find ({$or : [{name: "Tom"}, {age: 22}]})</code></p>
<p>Это выражение вернет нам все документы, в которых либо <code>name=Tom</code>, либо <code>age=22</code>.</p>
<p>Другой пример вернет нам все документы, в которых <code>name=Tom</code>, а age равно либо 22, либо среди значений <code>languages</code> есть “german”:</p>
<p><code>&gt; db.users.find ({name:"Tom", $or : [{age: 22}, {languages:"german"}]})</code></p>
<p>В подвыражениях <code>or</code> можно применять условные операторы:</p>
<p><code>&gt; db.users.find ({$or : [{name:"Tom"}, {age: {$gte:30}}]})</code></p>
<p>В данном случае мы выбираем все документы, где <code>name="Tom"</code> или поле <code>age</code> имеет значение от 30 и выше.</p>
<h4 id="оператор-and">Оператор $and</h4>
<p>Оператор <code>$and</code> представляет логическую операцию И (логическое умножение) и определяет набор критериев, которым обязательно должен соответствовать документ. В отличие от оператора <code>$or</code> документ должен соответствовать всем указанным критериям. Например:</p>
<blockquote>
<p>db.users.find ({$and : [{name: “Tom”}, {age: 32}]})</p>
</blockquote>
<p>Здесь выбираемые документы обязательно должны иметь имя Tom и возраст 32 – оба этих признака.</p>
<h3 id="поиск-по-массивам">Поиск по массивам</h3>
<p>Ряд операторов предназначены для работы с массивами:</p>
<ul>
<li>
<p>$all: определяет набор значений, которые должны иметься в массиве</p>
</li>
<li>
<p>$size: определяет количество элементов, которые должны быть в массиве</p>
</li>
<li>
<p>$elemMatch: определяет условие, которым должны соответствовать элемены в массиве</p>
</li>
</ul>
<h4 id="all">$all</h4>
<p>Оператор <code>$all</code> определяет массив возможных выражений и требует, чтобы документы имели весь определяемый набор выражений. Соответственно он применяется для поиску по массиву. Например, в документах есть массив <code>languages</code>, хранящий иностранные языки, на которых говорит пользователь. И чтобы найти всех людей, говорящих одновременно и по-английски, и по-французски, мы можем использовать следующее выражение:</p>
<blockquote>
<p>db.users.find ({languages: {$all : [“english”, “french”]}})</p>
</blockquote>
<h4 id="оператор-elemmatch">Оператор $elemMatch</h4>
<p>Оператор <code>$elemMatch</code> позволяет выбрать документы, в которых массивы содержат элементы, попадающие под определенные условия. Например, пусть в базе данных будет коллекция, которая содержит оценки пользователей по определенным курсам. Добавим несколько документов:</p>
<blockquote>
<p>db.grades.insertMany([{student: “Tom”, courses:[{name: “Java”, grade: 5}, {name: “MongoDB”, grade: 4}]},`</p>
</blockquote>
<p><code>{student:"Alice", courses:[{name:"C++", grade: 3}, {name: "MongoDB", grade: 5}]}])</code></p>
<p>Каждый документ имеет массив <code>courses</code>, который в свою очередь состоит из вложенных документов.</p>
<p>Теперь найдем студентов, которые для курса MongoDB имеют оценку выше 3:</p>
<blockquote>
<p><code>db.grades.find({courses: {$elemMatch: {name: "MongoDB", grade: {$gt: 3}}}})</code></p>
</blockquote>
<h4 id="оператор-size">Оператор $size</h4>
<p>Оператор <code>$size</code> используется для нахождения документов, в которых массивы имеют число элементов, равным значению <code>$size</code>. Например, извлечем все документы, в которых в массиве <code>laguages</code> два элемента:</p>
<blockquote>
<p>db.users.find ({languages: {$size:2}})</p>
</blockquote>
<p>Такой запрос будет соответствовать, например, следующему документу:</p>
<p><code>{"name": "Tom","age": 32, languages: ["english","german"]}</code></p>
<h3 id="оператор-exists">Оператор $exists</h3>
<p>Оператор <code>$exists</code> позволяет извлечь только те документы, в которых определенный ключ присутствует или отсутствует. Например, вернем все документы, в который есть ключ <code>company</code>:</p>
<blockquote>
<p>db.users.find ({company: {$exists: true}})</p>
</blockquote>
<p>Если мы укажем у оператора <code>$exists</code> в качестве параметра <code>false</code>, то запрос вернет нам только те документы, в которых не определен ключ <code>company</code>.</p>
<h3 id="оператор-type">Оператор $type</h3>
<p>Оператор $type извлекает только те документы, в которых определенный ключ имеет значение определенного типа, например, строку или число:</p>
<blockquote>
<p>db.users.find ({age: {<span class="katex--inline">KaTeX parse error: Expected 'EOF', got '}' at position 15: type: "string"}̲})
db.users.fin…</span>type: “number”}})</p>
</blockquote>
<h3 id="оператор-regex">Оператор $regex</h3>
<p>Оператор <code>$regex</code> задает регулярное выражение, которому должно соответствовать значение поля. Например, пусть поле <code>name</code> обязательно имеет букву “b”:</p>
<blockquote>
<p>db.users.find ({name: {$regex: “b”}})</p>
</blockquote>
<p>Важно понимать, что <code>$regex</code> принимает не просто строки, а именно регулярные выражения, например: <code>name: {$regex:"om$"}</code>  – значение <code>name</code> должно оканчиваться на “om”.</p>
<h3 id="метод-save">Метод save</h3>
<p>Как и другие системы управления базами данных MongoDB предоставляет возможность обновления данных. Наиболее простым для использования является метод <code>save</code>. В качестве параметра этот метод принимает документ.</p>
<p>В этот документ в качестве поля можно передать параметр <code>_id</code>. Если метод находит документ с таким значением <code>_id</code>, то документ обновляется. Если же с подобным <code>_id</code> нет документов, то документ вставляется.</p>
<p>Если параметр <code>_id</code> не указан, то документ вставляется, а параметр <code>_id</code> генерируется автоматически как при обычном добавлении через функцию <code>insert</code>:</p>
<blockquote>
<p>db.users.save({name: “Eugene”, age : 29, languages: [“english”, “german”, “spanish”]})</p>
</blockquote>
<p>В качестве результата функция возвращает объект <code>WriteResult</code>. Например, при успешном сохранении мы получим:</p>
<p><code>WriteResult({"nInserted": 1 })</code></p>
<h3 id="update">update</h3>
<p>Более детальную настройку при обновлении предлагает функция <code>update</code>. Она принимает три параметра:</p>
<ul>
<li>
<p><code>query</code>: принимает запрос на выборку документа, который надо обновить</p>
</li>
<li>
<p><code>objNew</code>: представляет документ с новой информацией, который заместит старый при обновлении</p>
</li>
<li>
<p><code>options</code>: определяет дополнительные параметры при обновлении документов. Может принимать два аргумента: <code>upsert</code> и <code>multi</code>.</p>
</li>
</ul>
<p>Если параметр <code>upsert</code> имеет значение <code>true</code>, что mongodb будет обновлять документ, если он найден, и создавать новый, если такого документа нет. Если же он имеет значение <code>false</code>, то mongodb не будет создавать новый документ, если запрос на выборку не найдет ни одного документа.</p>
<p>Параметр <code>multi</code> указывает, должен ли обновляться первый элемент в выборке (используется по умолчанию, если данный параметр не указан) или же должны обновляться все документы в выборке.</p>
<p>Например:</p>
<blockquote>
<p>db.users.update({name: “Tom”}, {name: “Tom”, age : 25}, {upsert: true})</p>
</blockquote>
<p>Теперь документ, найденный запросом <code>{name : "Tom"}</code>, будет перезаписан документом <code>{"name": "Tom", "age" :"25"}</code>.</p>
<p>Функция <code>update()</code> также возвращает объект WriteResult. Например:</p>
<p><code>WriteResult({"nMatched" : 1, "nUpserted": 0,"nModified": 1})</code></p>
<p>В данном случае результат говорит нам о том, что найден один документ, удовлетворяющий условию, и один документ был обновлен.</p>
<h3 id="обновление-отдельного-поля">Обновление отдельного поля</h3>
<p>Часто не требуется обновлять весь документ, а только значение одного из его ключей. Для этого применяется оператор <code>$set</code>. Если документ не содержит обновляемое поле, то оно создается.</p>
<blockquote>
<p>db.users.update({name: “Tom”, age: 29}, {$set: {age : 30}})</p>
</blockquote>
<p>Если обновляемого поля в документе нет, до оно добавляется:</p>
<blockquote>
<p>db.users.update({name : “Tom”, age: 29}, {$set: {salary : 300}})</p>
</blockquote>
<p>В данном случае обновлялся только один документ, первый в выборке. Указав значение <code>multi:true</code>, мы можем обновить все документы выборки:</p>
<blockquote>
<p>db.users.update({name : “Tom”}, {$set: {name: “Tom”, age : 25}}, {multi: true})</p>
</blockquote>
<p>Для простого увеличения значения числового поля на определенное количество единиц применяется оператор <code>$inc</code>. Если документ не содержит обновляемое поле, то оно создается. Данный оператор применим только к числовым значениям.</p>
<blockquote>
<p>db.users.update({name: “Tom”}, {$inc: {age:2}})</p>
</blockquote>
<h3 id="удаление-поля">Удаление поля</h3>
<p>Для удаления отдельного ключа используется оператор <code>$unset</code>:</p>
<blockquote>
<p>db.users.update({name : “Tom”}, {$unset: {salary: 1}})</p>
</blockquote>
<p>Если вдруг подобного ключа в документе не существует, то оператор не оказывает никакого влияния. Также можно удалять сразу несколько полей:</p>
<blockquote>
<p>db.users.update({name : “Tom”}, {$unset: {salary: 1, age: 1}})</p>
</blockquote>
<h3 id="updateone-и-updatemany">updateOne и updateMany</h3>
<p>Метод <code>updateOne</code> похож на метод <code>update</code> за тем исключением, что он обновляет только один документ.</p>
<blockquote>
<p>db.users.updateOne({name : “Tom”, age: 29}, {$set: {salary : 360}})</p>
</blockquote>
<p>Если необходимо обновить все документы, соответствующие некоторому критерию, то применяется метод <code>updateMany()</code>:</p>
<blockquote>
<p>db.users.updateMany({name : “Tom”}, {$set: {salary : 560}})</p>
</blockquote>
<h3 id="обновление-массивов">Обновление массивов</h3>
<h4 id="оператор-push">Оператор $push</h4>
<p>Оператор <code>$push</code> позволяет добавить еще одно значение к уже существующему. Например, если ключ в качестве значения хранит массив:</p>
<blockquote>
<p>db.users.updateOne({name : “Tom”}, {$push: {languages: “russian”}})</p>
</blockquote>
<p>Если ключ, для которого мы хотим добавить значение, не представляет массив, то мы получим ошибку <code>Cannot apply $push/$pushAll modifier to non-array</code>.</p>
<p>Используя оператор <code>$each</code>, можно добавить сразу несколько значений:</p>
<blockquote>
<p>db.users.update({name : “Tom”}, {<span class="katex--inline">KaTeX parse error: Expected '}', got 'EOF' at end of input: …: {languages: {</span>each: [“russian”, “spanish”, “italian”]}}})</p>
</blockquote>
<p>Еще пара операторов позволяет настроить вставку. Оператор <code>$position</code> задает позицию в массиве для вставки элементов, а оператор <code>$slice</code> указывает, сколько элементов оставить в массиве после вставки.</p>
<blockquote>
<p>db.users.update({name : “Tom”}, {<span class="katex--inline">KaTeX parse error: Expected '}', got 'EOF' at end of input: …: {languages: {</span>each: [“german”, “spanish”, “italian”], $position:1, $slice:5}}})</p>
</blockquote>
<p>В данном случае элементы <code>["german", "spanish", "italian"]</code> будут вставляться в массив languages с 1-го индекса, и после вставки, в массиве останутся только 5 первых элементов.</p>
<h4 id="оператор-addtoset">Оператор $addToSet</h4>
<p>Оператор <code>$addToSet</code> подобно оператору <code>$push</code> добавляет объекты в массив. Отличие состоит в том, что <code>$addToSet</code> добавляет данные, если их еще нет в массиве:</p>
<blockquote>
<p>db.users.update({name : “Tom”}, {$addToSet: {languages: “russian”}})</p>
</blockquote>
<h3 id="удаление-элемента-из-массива">Удаление элемента из массива</h3>
<p>Оператор <code>$pop</code> позволяет удалять элемент из массива:</p>
<blockquote>
<p>db.users.update({name : “Tom”}, {$pop: {languages: 1}})</p>
</blockquote>
<p>Указывая для ключа <code>languages</code> значение 1, мы удаляем первый элемент с конца. Чтобы удалить первый элемент сначала массива, надо передать отрицательное значение:</p>
<blockquote>
<p>db.users.update({name : “Tom”}, {$pop: {languages: -1}})</p>
</blockquote>
<p>Несколько иное действие предполагает оператор <code>$pull</code>. Он удаляет каждое вхождение элемента в массив. Например, через оператор <code>$push</code> мы можем добавить одно и то же значение в массив несколько раз. И теперь с помощью <code>$pull</code> удалим его:</p>
<blockquote>
<p>db.users.update({name : “Tom”}, {$pull: {languages: “english”}})</p>
</blockquote>
<p>А если мы хотим удалить не одно значение, а сразу несколько, тогда мы можем применить оператор <code>$pullAll</code>:</p>
<blockquote>
<p>db.users.update({name : “Tom”}, {$pullAll: {languages: [“english”, “german”, “french”]}})</p>
</blockquote>
<h2 id="удаление-данных">5. Удаление данных</h2>
<p>Для удаления документов в MongoDB предусмотрен метод <code>remove</code>:</p>
<blockquote>
<p>db.users.remove({name : “Tom”})</p>
</blockquote>
<p>Метод <code>remove()</code> возвращает объект <code>WriteResult</code>. При успешном удалении одного документа результат будет следующим:</p>
<p><code>WriteResult({"nRemoved": 1})</code></p>
<p>В итоге все найденные документы с <code>name=Tom</code> будут удалены. Причем, как и в случае с <code>find</code>, мы можем задавать условия выборки для удаления различными способами (в виде регулярных выражений, в виде условных конструкций и т.д.):</p>
<blockquote>
<p>db.users.remove({name : /T\w+/i})<br>
db.users.remove({age: {$lt : 30}})</p>
</blockquote>
<p>Метод <code>remove</code> также может принимать второй необязательный параметр булева типа, который указывает, надо удалять один элемент или все элементы, соответствующие условию. Если этот параметр равен <code>true</code>, то удаляется только один элемент. По умолчанию он равен <code>false</code>:</p>
<blockquote>
<p>db.users.remove({name : “Tom”}, true)</p>
</blockquote>
<p>Чтобы удалить разом все документы из коллекции, надо оставить пустым параметр запроса:</p>
<blockquote>
<p>db.users.remove({})</p>
</blockquote>
<h3 id="удаление-коллекций-и-баз-данных">Удаление коллекций и баз данных</h3>
<p>Мы можем удалять не только документы, но и коллекции и базы данных. Для удаления коллекций используется функция <code>drop</code>:</p>
<blockquote>
<p>db.users.drop()</p>
</blockquote>
<p>И если удаление коллекции пройдет успешно, то консоль выведет:</p>
<p><code>true</code></p>
<p>Чтобы удалить всю базу данных, надо воспользоваться функцией <code>dropDatabase()</code>:</p>
<blockquote>
<p>db.dropDatabase()</p>
</blockquote>
<h2 id="варианты-заданий-на-лабораторную-работу">Варианты заданий на лабораторную работу</h2>
<h3 id="документ-в-формате-json">Документ в формате json</h3>
<pre class=" language-json"><code class="prism  language-json"><span class="token punctuation">{</span>
id<span class="token punctuation">:</span> <span class="token number">1155151</span><span class="token punctuation">,</span>
date<span class="token punctuation">:</span> <span class="token string">"2020-05-20"</span><span class="token punctuation">,</span>
buyer<span class="token punctuation">:</span> <span class="token string">"Луаврик Л. Луаврик"</span><span class="token punctuation">,</span>
items<span class="token punctuation">:</span> <span class="token punctuation">[</span>
		<span class="token punctuation">{</span>
		code<span class="token punctuation">:</span> <span class="token number">41155415</span><span class="token punctuation">,</span>
		name<span class="token punctuation">:</span> <span class="token string">"256 ГБ SSD-накопитель Transcend 230S"</span><span class="token punctuation">,</span>
		price<span class="token punctuation">:</span> <span class="token number">4750.00</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span>
		code<span class="token punctuation">:</span> <span class="token number">115521856</span><span class="token punctuation">,</span>
		name<span class="token punctuation">:</span> <span class="token string">"Зеркальная камера Nikon D3500 Kit 18-140mm VR AF-S"</span><span class="token punctuation">,</span>
		price<span class="token punctuation">:</span> <span class="token number">48000.00</span>
		<span class="token punctuation">}</span>	
		<span class="token punctuation">]</span><span class="token punctuation">,</span>
total<span class="token punctuation">:</span> <span class="token number">52750.00</span><span class="token punctuation">,</span>
payment_type<span class="token punctuation">:</span> <span class="token string">"наличные"</span>
<span class="token punctuation">}</span>
</code></pre>
<h3 id="примеры-документов">Примеры документов</h3>
<ol>
<li>Библиотека. Читательский билет с записями о книгах, находящихся у читателя.</li>
<li>Аптека. Товарный чек с информацией о купленных лекарствах.</li>
<li>Больница. Информация о лечении: пациент, врач, дата начала, дата окончания, виды лечения (список).</li>
<li>Предприятие. Информация о сотруднике и истории его назначений.</li>
<li>Курьерская доставка. Информация о посылке: отправитель (Ф.И.О., адрес отправления, паспортные данные), получатель (Ф.И.О, адрес получения, паспортные данные), масса и габариты посылки, информация о курьере и датах отправления и получения.</li>
<li>Повышение квалификации. Список курсов университета: Даты проведения, информация о преподавателе, наименование, количество часов, записанные на курсы сотрудники (до 3).</li>
<li>Научная конференция. Программа конференции: дата и наименование конференции, несколько секций со списком статей в каждой секции.</li>
<li>Прокат велосипедов. Информация об использовании велосипеда: дата начала, дата окончания, марка (тип), информация о клиенте, стоимость.</li>
<li>Футбольный турнир (РФПЛ). Игры: команда 1, основной состав (достаточно указать 3 игроков), команда 2, основой состав (достаточно указать 3 игроков), счет, информация о голах.</li>
<li>Пиццерия. Информация о пиццерии со списком продаваемых пицц.</li>
<li>Кулинарная книга. Рецепт.</li>
<li>Поликлиника. Информация о посещениях: дата, врач, посетитель, диагноз.</li>
<li>Сессия. Результаты экзаменов с указанием информации о преподавателе и списке студентов с оценками (до 5 студентов).</li>
<li>Расписание занятий. Расписание занятий на 1 день (для нескольких групп)</li>
<li>Социальная сеть. Изобразите диаграмму сущность связь для социальной сети Сообщения с главной страницы: дата, текст, комментарии (автор, текст).</li>
<li>Интернет-магазин мебели. Товарный чек с информацией о товарах, покупателе и магазине.</li>
<li>Онлайн кинотеатр. Информация о пользователе: Имя, предпочтения, список просмотренных фильмов (жанр, наименование, дата просмотра, длительность).</li>
<li>Бронирование авиабилетов. Информация о заказанных билетах: пункт А в пункт Б, дата, вес багажа, тип меню.</li>
<li>Музыкальные альбомы. Музыкальные альбомы.</li>
<li>Бронирование авиабилетов. Брони.</li>
<li>Курсы и студенты. Проекты: дата начала и окончания, информация о сотрудниках в проекте (до трех): имя, идентификационный номер, адрес, зарплата и дата рождения.</li>
<li>Галереи. Несколько групп со списком произведений в каждой группе.</li>
<li>Сеть отелей. Информация об истории бронирования номеров: дата начала, окончания, список постояльцев, стоимость.</li>
<li>Прокат автомобилей. Список автомобилей с историей их использования.</li>
<li>КХЛ. Информация об играх: команда 1, основной состав (достаточно указать 3 игроков), команда 2, основой состав (достаточно указать 3 игроков), счет, информация о голах.</li>
<li>Книжный онлайн-магазин. Товарный чек.</li>
<li>Мастерская. Коллекция документов с информациях о заказах: дана начала и окончания, имя мастера, имя клиента, техника, ее вид, список работ.</li>
<li>ЖЭК. Список заявок: дана начала и окончания работ, адрес клиента, бригада специалистов со списком специалистов.</li>
<li>Парки. Информация о трех парках, с указанием наименования, площади, место адреса и списка павильонов (до трех): наименование, тип (кафе, продуктовый, развлекательный, прокат вещей), занимаемая площадь.</li>
</ol>

