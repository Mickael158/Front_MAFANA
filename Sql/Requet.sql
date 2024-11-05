
SELECT Valeur FROM Prix_cotisation 
    WHERE id = (select Max(id) FROM Prix_cotisation WHERE date_modif <= NOW())


WITH personne_marier AS (
    SELECT 
        CASE 
            WHEN d_mari.id_personne_membre_id IS NULL THEN p_mari.id
            WHEN d_marie.id_personne_membre_id IS NULL THEN p_marie.id
            ELSE NULL
        END AS id_personne_marier_vivant
    from mariage m 
        LEFT JOIN personne_membre p_mari on p_mari.id=m.id_mari_id
        LEFT JOIN personne_membre p_marie on p_marie.id=m.id_marie_id
        LEFT JOIN decede d_mari on p_mari.id=d_mari.id_personne_membre_id
        LEFT JOIN decede d_marie on p_marie.id=d_marie.id_personne_membre_id
    WHERE d_mari.id_personne_membre_id IS NULL OR d_marie.id_personne_membre_id IS NULL
)
(SELECT
        personne_membre.*,
        MAX(p_c.date_payer) as dernier_payement,
        'Marier' as situation
    FROM personne_membre 
        JOIN personne_marier p_m ON p_m.id_personne_marier_vivant=personne_membre.id
        LEFT JOIN payement_cotisation p_c ON p_c.id_personne_membre_id=personne_membre.id
    GROUP BY personne_membre.id)
UNION(SELECT 
        p_m.*,
        MAX(p_c.date_payer) as dernier_payement,
        'Celibataire' as situation
    FROM personne_membre p_m
        LEFT JOIN mariage mari ON p_m.id=mari.id_mari_id OR p_m.id=mari.id_marie_id
        LEFT JOIN payement_cotisation p_c ON p_c.id_personne_membre_id=p_m.id
    WHERE mari.id_mari_id IS NULL OR p_m.id=mari.id_marie_id IS NULL
    AND EXTRACT(YEAR FROM AGE(date_de_naissance)) >= 21
    GROUP BY p_m.id);

SELECT 
        p_m.*,
        Coalesce(MAX(p_c.date_payer) , p_m.date_inscription) as dernier_payement
    FROM personne_membre p_m
        LEFT JOIN payement_cotisation p_c ON p_c.id_personne_membre_id=p_m.id
    WHERE p_m.id=1
    GROUP BY p_m.id;

SELECT 
    CASE 
        WHEN p_mari.id = 1 THEN p_marie.* 
        WHEN p_marie.id = 1 THEN p_mari.* 
    END
        FROM mariage m   
            JOIN personne_membre p_mari ON p_mari.id = m.id_mari_id
            JOIN personne_membre p_marie ON p_marie.id = m.id_marie_id
        WHERE 1 IN (p_mari.id, p_marie.id)
        AND NOT EXISTS (
                        SELECT 1 
                        FROM decede d 
                        WHERE (p_mari.id = 1 AND d.id_personne_membre_id = p_marie.id) 
                        OR (p_marie.id = 1 AND d.id_personne_membre_id = p_mari.id)
                    );


SELECT * FROM Prix_Charge WHERE id = (
                SELECT MAX(id) 
                FROM Prix_Charge 
                WHERE date_insertion_prix_charge <= '2024-09-19'
                AND id_charge_id = 1
            )

SELECT 
        *
    FROM enfant en   
            JOIN mariage m ON m.id = en.id_mariage_parent_id
            JOIN personne_membre p ON p.id = en.id_enfant_id
        WHERE EXTRACT(YEAR FROM AGE(p.date_de_naissance)) <= 21
        AND NOT EXISTS (
                        SELECT 1 
                        FROM decede d 
                        WHERE (p.id = 1 AND d.id_personne_membre_id = p_marie.id)
                    );

SELECT 
    e.id_enfant_id AS idEnfant
    FROM  enfant e
        JOIN  mariage m ON e.id_mariage_parent_id = m.id
        JOIN  personne_membre p ON e.id_enfant_id = p.id
    WHERE  m.id_mari_id = 1 OR m.id_marie_id = 1
    AND EXTRACT(YEAR FROM AGE(p.date_de_naissance)) <= 21;

select *
    from demande_financier df
        JOIN payement_cotisation pc on pc.id_personne_membre_id = df.id_personne_membre_id
    
WITH allMaterielExistant as(
    select DISTINCT id_materiel_id FROM donnation_materiel
)
SELECT *
    FROM materiel m
        JOIN allMaterielExistant am on am.id_materiel_id=m.id

select dm.* , pc.date_de_payement , mp.date_inscription
    from demande_financier dm     
        JOIN personne_membre mp on mp.id=dm.id_personne_membre_id
        JOIN payement_cotisation pc on pc.id_personne_membre_id=dm.id_personne_membre_id
        LEFT JOIN validation_demande_financier v ON dm.id = v.id_demande_financier_id
    WHERE pc.date_de_payement=(
        select Max(p.date_de_payement)
                FROM payement_cotisation p where p.id_personne_membre_id=mp.id
    )
    AND v.id_demande_financier_id IS NULL;

SELECT dm.*,
       COALESCE(pc.date_de_payement, mp.date_inscription) AS date_de_payement,
       mp.date_inscription
            FROM demande_financier dm
    LEFT JOIN validation_demande_financier v ON dm.id = v.id_demande_financier_id
    LEFT JOIN payement_cotisation pc ON pc.id_personne_membre_id = dm.id_personne_membre_id
    JOIN personne_membre mp ON mp.id = dm.id_personne_membre_id
        WHERE (pc.date_de_payement IS NULL
            OR pc.date_de_payement = (
                SELECT MAX(p.date_de_payement)
                FROM payement_cotisation p
                WHERE p.id_personne_membre_id = mp.id
                AND p.date_de_payement IS NOT NULL
       ))
        AND v.id_demande_financier_id IS NULL;

SELECT DISTINCT  dm.*,
       COALESCE(pc.date_de_payement, mp.date_inscription) AS date_de_payement,
       mp.date_inscription
            FROM demande_materiel dm
    LEFT JOIN validation_demande_materiel v ON dm.id = v.id_demande_materiel_id
    LEFT JOIN payement_cotisation pc ON pc.id_personne_membre_id = dm.id_personne_membre_id
    JOIN personne_membre mp ON mp.id = dm.id_personne_membre_id
        WHERE (pc.date_de_payement IS NULL
            OR pc.date_de_payement = (
                SELECT MAX(p.date_de_payement)
                FROM payement_cotisation p
                WHERE p.id_personne_membre_id = mp.id
                AND p.date_de_payement IS NOT NULL
       ))
        AND v.id_demande_materiel_id IS NULL;

WITH debit as (     
    SELECT id_materiel_id, COUNT(nombre) AS nombre
    FROM donnation_Materiel
        GROUP BY id_materiel_id
)
select dm.id_materiel_id , COUNT(vdm.nombre) 
    from validation_demande_materiel vdm
        JOIN demande_materiel dm on dm.id=vdm.id_demande_materiel_id
    GROUP BY dm.id_materiel_id;

///

WITH donnation_counts AS (
        SELECT id_materiel_id, SUM(nombre) AS nombre
            FROM donnation_Materiel
        GROUP BY id_materiel_id
),
validation_counts AS (
    SELECT dm.id_materiel_id, SUM(vdm.nombre) AS nombre_valide
        FROM validation_demande_materiel vdm
            JOIN demande_materiel dm ON dm.id = vdm.id_demande_materiel_id
        GROUP BY dm.id_materiel_id
)
SELECT 
    dc.id_materiel_id, 
    COALESCE(dc.nombre, 0) - COALESCE(vc.nombre_valide, 0) AS difference
        FROM donnation_counts dc
    LEFT JOIN validation_counts vc ON dc.id_materiel_id = vc.id_materiel_id
    WHERE dc.id_materiel_id = 5;


WITH donnation_counts AS (
    SELECT id_materiel_id, COUNT(nombre) AS nombre
    FROM donnation_materiel
    GROUP BY id_materiel_id
),
validation_counts AS (
    SELECT dm.id_materiel_id, COUNT(vdm.nombre) AS nombre_valide
    FROM validation_demande_materiel vdm
    JOIN demande_materiel dm ON dm.id = vdm.id_demande_materiel_id
    GROUP BY dm.id_materiel_id
),
allMaterielExistant AS (
    SELECT DISTINCT id_materiel_id FROM donnation_materiel
),
materiel_diff AS (
    SELECT 
        dc.id_materiel_id, 
        COALESCE(dc.nombre, 0) - COALESCE(vc.nombre_valide, 0) AS difference
    FROM donnation_counts dc
    LEFT JOIN validation_counts vc ON dc.id_materiel_id = vc.id_materiel_id
)
SELECT m.*
FROM materiel m
JOIN allMaterielExistant am ON am.id_materiel_id = m.id
JOIN materiel_diff md ON md.id_materiel_id = m.id
WHERE md.difference != 0;

SELECT DISTINCT dm.*,
       COALESCE(pc.date_de_payement, mp.date_inscription) AS date_de_payement,
       mp.date_inscription
            FROM demande_financier dm
    LEFT JOIN validation_demande_financier v ON dm.id = v.id_demande_financier_id
    LEFT JOIN payement_cotisation pc ON pc.id_personne_membre_id = dm.id_personne_membre_id
    LEFT JOIN refuser_Demande_Financier rf ON rf.id_demande_financier_id = dm.id
    JOIN personne_membre mp ON mp.id = dm.id_personne_membre_id
        WHERE (pc.date_de_payement IS NULL
            OR pc.date_de_payement = (
                SELECT MAX(p.date_de_payement)
                FROM payement_cotisation p
                WHERE p.id_personne_membre_id = mp.id
                AND p.date_de_payement IS NOT NULL
       ))
        AND v.id_demande_financier_id IS NULL
        AND rf.id_demande_financier_id IS NULL;

SELECT DISTINCT dm.*,
       COALESCE(pc.date_de_payement, mp.date_inscription) AS date_de_payement,
       mp.date_inscription
FROM demande_materiel dm
LEFT JOIN validation_demande_materiel v ON dm.id = v.id_demande_materiel_id
LEFT JOIN payement_cotisation pc ON pc.id_personne_membre_id = dm.id_personne_membre_id
LEFT JOIN refuser_Demande_Materiel rm ON rm.id_demande_materiel_id = dm.id
JOIN personne_membre mp ON mp.id = dm.id_personne_membre_id
WHERE (pc.date_de_payement IS NULL
    OR pc.date_de_payement = (
        SELECT MAX(p.date_de_payement)
        FROM payement_cotisation p
        WHERE p.id_personne_membre_id = mp.id
        AND p.date_de_payement IS NOT NULL
    ))
AND v.id_demande_materiel_id IS NULL
AND rm.id_demande_materiel_id IS NULL;


SELECT m.id ,  pm.id , pm.nom_membre , pm.prenom_membre , pme.id , pme.nom_membre , pme.prenom_membre 
    from mariage m
    JOIN personne_membre pm on pm.id = m.id_mari_id
    JOIN personne_membre pme on pme.id = m.id_marie_id;

INSERT INTO tresoreri ( montant, date_tresoreri) VALUES
( 1500, '2024-02-15'),
( 2000, '2024-02-28'),
( 1800, '2024-03-10'),
( 1700, '2024-03-25'),
( 2100, '2024-03-31'),
( 2500, '2024-04-05'),
( 2400, '2024-04-20'),
( 2600, '2024-04-30'),
( 2200, '2024-05-10'),
( 2300, '2024-05-25'),
( 3000, '2024-05-31'),
( 3100, '2024-06-01'),
( 3200, '2024-06-15'),
( 3400, '2024-06-30'),
( 2900, '2024-07-10'),
( 2800, '2024-07-20'),
( 3500, '2024-07-31'),
( 4000, '2024-08-01'),
( 3700, '2024-08-20'),
( 3900, '2024-08-31');



select pm.* from personne_membre pm
    LEFT join quitte q on q.id_personne_membre_id=pm.id
where q.id_personne_membre_id is NULL;


insert into vallee ( nom_vallee) (select distinct(trangobe) from import_membre);


    

CREATE TABLE personne(
    id SERIAL PRIMARY KEY,
    dtn date
);
CREATE TABLE mariage(
    id INT PRIMARY KEY,
    idMarie INT REFERENCES personne(id),
    idMarie INT REFERENCES personne(id)
);
CREATE TABLE enfant(
    id SERIAL PRIMARY KEY,
    idMariage INT REFERENCES mariage(id),
    idEnfant INT REFERENCES personne(id)
);
CREATE TABLE cotisation(
    id SERIAL PRIMARY KEY,
    id_personne INT REFERENCES personne(id),
    montant double precision
);

WITH personne_marier AS (
        SELECT 
            CASE 
                WHEN d_mari.id_personne_membre_id IS NULL THEN p_mari.id
                WHEN d_marie.id_personne_membre_id IS NULL THEN p_marie.id
                ELSE NULL
            END AS id_personne_marier_vivant
        FROM mariage m 
            LEFT JOIN personne_membre p_mari ON p_mari.id = m.id_mari_id
            LEFT JOIN personne_membre p_marie ON p_marie.id = m.id_marie_id
            LEFT JOIN decede d_mari ON p_mari.id = d_mari.id_personne_membre_id
            LEFT JOIN decede d_marie ON p_marie.id = d_marie.id_personne_membre_id
        WHERE d_mari.id_personne_membre_id IS NULL OR d_marie.id_personne_membre_id IS NULL
    )
    SELECT
        personne_membre.*,
        MAX(p_c.date_payer) AS dernier_payement,
        'Marier' AS situation
    FROM personne_membre 
        JOIN personne_marier p_m ON p_m.id_personne_marier_vivant = personne_membre.id
        LEFT JOIN payement_cotisation p_c ON p_c.id_personne_membre_id = personne_membre.id
        LEFT JOIN quitte q  on personne_membre.id = q.id_personne_membre_id
        WHERE q.id_personne_membre_id IS NULL
    GROUP BY personne_membre.id
    UNION
    (WITH personne_celibataire AS(
        SELECT 
                p_m.*,
                MAX(p_c.date_payer) AS dernier_payement,
                'Celibataire' AS situation
            FROM personne_membre p_m
                LEFT JOIN mariage mari ON p_m.id = mari.id_mari_id OR p_m.id = mari.id_marie_id
                LEFT JOIN payement_cotisation p_c ON p_c.id_personne_membre_id = p_m.id
                LEFT JOIN quitte q  on p_m.id = q.id_personne_membre_id
            WHERE q.id_personne_membre_id IS NULL 
            AND EXTRACT(YEAR FROM AGE(date_de_naissance)) >= 21
            AND mari.id_mari_id IS NULL 
            OR  mari.id_marie_id IS NULL
            GROUP BY p_m.id
    )
        select personne_celibataire.*
            from personne_celibataire
                LEFT JOIN  decede d ON personne_membre.id = d.id_personne_membre_id
            WHERE d.id_personne_membre_id IS NULL
    );
    

WITH personne_marier AS (
    SELECT 
        CASE 
            WHEN d_mari.id_personne_membre_id IS NULL THEN p_mari.id
            WHEN d_marie.id_personne_membre_id IS NULL THEN p_marie.id
            ELSE NULL
        END AS id_personne_marier_vivant
    FROM mariage m 
    LEFT JOIN personne_membre p_mari ON p_mari.id = m.id_mari_id
    LEFT JOIN personne_membre p_marie ON p_marie.id = m.id_marie_id
    LEFT JOIN decede d_mari ON p_mari.id = d_mari.id_personne_membre_id
    LEFT JOIN decede d_marie ON p_marie.id = d_marie.id_personne_membre_id
    WHERE d_mari.id_personne_membre_id IS NULL OR d_marie.id_personne_membre_id IS NULL
),
personne_celibataire AS (
    SELECT 
        p_m.*,
        MAX(p_c.date_payer) AS dernier_payement,
        'Celibataire' AS situation
    FROM personne_membre p_m
    LEFT JOIN mariage mari ON p_m.id = mari.id_mari_id OR p_m.id = mari.id_marie_id
    LEFT JOIN payement_cotisation p_c ON p_c.id_personne_membre_id = p_m.id
    LEFT JOIN quitte q ON p_m.id = q.id_personne_membre_id
    WHERE q.id_personne_membre_id IS NULL 
      AND EXTRACT(YEAR FROM AGE(date_de_naissance)) >= 21
      AND (mari.id_mari_id IS NULL AND mari.id_marie_id IS NULL)
    GROUP BY p_m.id
)
SELECT 
    personne_membre.*,
    MAX(p_c.date_payer) AS dernier_payement,
    'Marier' AS situation
FROM personne_membre 
JOIN personne_marier p_m ON p_m.id_personne_marier_vivant = personne_membre.id
LEFT JOIN payement_cotisation p_c ON p_c.id_personne_membre_id = personne_membre.id
LEFT JOIN quitte q ON personne_membre.id = q.id_personne_membre_id
WHERE q.id_personne_membre_id IS NULL
GROUP BY personne_membre.id

UNION

SELECT 
    personne_celibataire.*
FROM personne_celibataire
LEFT JOIN decede d ON personne_celibataire.id = d.id_personne_membre_id
WHERE d.id_personne_membre_id IS NULL;




 select p.* from  profession p
    left join  personne_membre_profession pmp on pmp.id_profession_id=p.id
    where p.id IS NULL
    AND pmp.id_personne_membre_id=1;




        
SELECT pm.*, COALESCE(SUM(pc.montant_cotisation_total_payer), 0) as total
    FROM personne_membre pm
    LEFT JOIN payement_cotisation pc ON pm.id = pc.id_personne_membre_id
    WHERE pm.id = 1
    GROUP BY pm.id;


SELECT 
    COALESCE(SUM(c.montant_cotisation_total_payer), 0) AS total_cotisation
FROM 
    mariage m
LEFT JOIN 
    enfant e ON m.id = e.id_mariage_parent_id
LEFT JOIN 
    personne_membre p_enfant ON e.id = p_enfant.id
LEFT JOIN 
    payement_cotisation c ON c.id_personne_membre_id = p_enfant.id
WHERE 
    (m.id_mari_id = 1 OR m.id_marie_id = 1)
    AND AGE(p_enfant.date_de_naissance) < INTERVAL '21 years'
GROUP BY 
    m.id_mari_id, m.id_marie_id;

select p.* , pc. from payement_cotisation pc
    join personne_membre p on p.id=pc.id_personne_membre_id;




select r.* from role_suspendu r 
where NOW() BETWEEN r.date_suspension AND r.date_fin_suspension OR r.date_fin_suspension IS NULL;

SELECT p.* , cp.* 

    FROM personne_membre p

    LEFT JOIN payement_cotisation cp ON p.id = cp.id_personne_membre_id;



WITH personne_marier AS (
        SELECT 
            CASE 
                WHEN d_mari.id_personne_membre_id IS NULL THEN p_mari.id
                WHEN d_marie.id_personne_membre_id IS NULL THEN p_marie.id
                ELSE NULL
            END AS id_personne_marier_vivant
        FROM mariage m 
        LEFT JOIN personne_membre p_mari ON p_mari.id = m.id_mari_id
        LEFT JOIN personne_membre p_marie ON p_marie.id = m.id_marie_id
        LEFT JOIN decede d_mari ON p_mari.id = d_mari.id_personne_membre_id
        LEFT JOIN decede d_marie ON p_marie.id = d_marie.id_personne_membre_id
        WHERE d_mari.id_personne_membre_id IS NULL OR d_marie.id_personne_membre_id IS NULL
    ),
    personne_celibataire AS (
        SELECT 
            p_m.*,
            MAX(p_c.date_payer) AS dernier_payement,
            'Celibataire' AS situation
        FROM personne_membre p_m
        LEFT JOIN mariage mari ON p_m.id = mari.id_mari_id OR p_m.id = mari.id_marie_id
        LEFT JOIN payement_cotisation p_c ON p_c.id_personne_membre_id = p_m.id
        LEFT JOIN quitte q ON p_m.id = q.id_personne_membre_id
        WHERE q.id_personne_membre_id IS NULL 
        AND EXTRACT(YEAR FROM AGE(date_de_naissance)) >= 21
        AND (mari.id_mari_id IS NULL AND mari.id_marie_id IS NULL)
        GROUP BY p_m.id
    )
    SELECT 
        personne_membre.*,
        MAX(p_c.date_payer) AS dernier_payement,
        'Marier' AS situation
    FROM personne_membre 
    JOIN personne_marier p_m ON p_m.id_personne_marier_vivant = personne_membre.id
    LEFT JOIN payement_cotisation p_c ON p_c.id_personne_membre_id = personne_membre.id
    LEFT JOIN quitte q ON personne_membre.id = q.id_personne_membre_id
    WHERE q.id_personne_membre_id IS NULL
    AND (personne_membre.nom_membre ='RAZAFINDRAKOTO' 
        OR personne_membre.prenom_membre = 'RAZAFINDRAKOTO' 
        OR personne_membre.email = 'RAZAFINDRAKOTO'
        OR personne_membre.telephone = 'RAZAFINDRAKOTO'
        OR personne_membre.telephone = 'RAZAFINDRAKOTO')
    AND personne_membre.id_village_id =1
    GROUP BY personne_membre.id

    UNION

    SELECT 
        personne_celibataire.*
    FROM personne_celibataire
    LEFT JOIN decede d ON personne_celibataire.id = d.id_personne_membre_id
    WHERE d.id_personne_membre_id IS NULL
    AND (personne_celibataire.nom_membre ='RAZAFINDRAKOTO' 
        OR personne_celibataire.prenom_membre = 'RAZAFINDRAKOTO' 
        OR personne_celibataire.email = 'RAZAFINDRAKOTO'
        OR personne_celibataire.telephone = 'RAZAFINDRAKOTO'
        OR personne_celibataire.telephone = 'RAZAFINDRAKOTO')
    AND personne_celibataire.id_village_id =1;



select pm.* from personne_membre pm
    JOIN Village v on v.id = pm.id_village_id
    JOIN Genre g on g.id = pm.id_genre_id
    JOIN personne_membre_profession pmp on pmp.id_personne_membre_id = pm.id
    WHERE 1=1
        AND (pm.nom_membre = 'RAZAFINDRAKOTO' OR pm.prenom_membre = 'Mickael' OR pm.telephone = '0343562462' OR pm.email='razafindrakoto77@gmail.com')
        AND (v.id = 1)
        AND (g.id = 1)
        AND (pmp.id_profession_id = 1)
        LIMIT 10;

select dm.*    
    FROM demande_materiel dm 
        JOIN validation_demande_materiel vdm on dm.id = vdm.id_demande_materiel_id
        JOIN personne_membre pm on pm.id=dm.id_personne_membre_id
        WHERE 1=1
    AND (pm.nom_membre='Mickael' OR pm.prenom_membre='Mickael') 
    AND dm.id_materiel_id = 1
    AND dm.date_demande_financier BETWEEN '2024-10-24' AND '2024-10-24'
    LIMIT 10;

select dm.*    
    FROM demande_financier dm 
        JOIN validation_demande_financier vdm on dm.id = vdm.id_demande_financier_id
        JOIN personne_membre pm on pm.id=dm.id_personne_membre_id
    WHERE 1=1
    AND (pm.nom_membre='Mickael' OR pm.prenom_membre='Mickael') 
    AND dm.montant > 0
    AND dm.date_demande_financier BETWEEN '2024-10-24' AND '2024-10-24'
    LIMIT 10;

INSERT INTO personne_membre (id, id_village_id, id_genre_id, nom_membre, date_de_naissance, address, email, telephone, prenom_membre, date_inscription) VALUES
(6, 1, 1, 'RAKOTONDRAMANANA', '1998-03-12', 'Ampasampito', 'rakoto.manana@gmail.com', '0343249876', 'Faly', '2023-12-12'),
(7, 1, 2, 'RAKOTOMANGA', '1999-06-01', 'Ambohipo', 'rakotomanga@gmail.com', '0344458712', 'Rina', '2023-11-25'),
(8, 4, 1, 'ANDRIAMBOLOLONA', '2001-01-23', 'Ankadimbahoaka', 'andriambo@gmail.com', '0341238547', 'Sitraka', '2024-02-12'),
(9, 3, 2, 'ANDRIANINA', '2000-05-16', 'Ambohijanahary', 'andrianina@gmail.com', '0347896541', 'Tahiry', '2024-04-03'),
(10, 2, 1, 'RAVELOSOA', '2003-11-09', 'Andoharanofotsy', 'ravelo@gmail.com', '0349952314', 'Feno', '2024-06-24'),
(11, 1, 1, 'RAKOTO', '1997-09-19', 'Ambanidia', 'rakoto1997@gmail.com', '0348765412', 'Miora', '2023-09-19'),
(12, 3, 2, 'RANDRIANASOLO', '2001-04-12', 'Ivandry', 'randrianasolo@gmail.com', '0349987456', 'Fanilo', '2024-01-15'),
(13, 4, 2, 'ANDRIANARIZAKA', '1996-12-24', 'Mahamasina', 'andrianarizaka@gmail.com', '0342340987', 'Hoby', '2024-03-20'),
(14, 1, 1, 'RANDRIANOMENJANAHARY', '2005-07-28', 'Andraisoro', 'randrianomenjanahary@gmail.com', '0345654781', 'Lala', '2024-05-07'),
(15, 2, 2, 'RAZAKANDRANIVO', '1995-02-14', 'Analakely', 'razakandranivo@gmail.com', '0347785412', 'Zo', '2024-07-18'),
(16, 3, 1, 'RABEHARISOA', '2002-10-01', 'Mahazoarivo', 'rabeharisoa@gmail.com', '0347898521', 'Elysee', '2024-02-14'),
(17, 4, 2, 'ANDRIANARIVELO', '1998-11-22', 'Ankatso', 'andrianarivelo@gmail.com', '0349091234', 'Hanitra', '2023-12-01'),
(18, 2, 1, 'RANDRIAMANANTENA', '2000-01-05', 'Ambatomaro', 'randriamanantena@gmail.com', '0341123586', 'Tahina', '2023-11-17'),
(19, 1, 2, 'RAZAFINDRABE', '1999-08-19', 'Anosibe', 'razafindrabe@gmail.com', '0347846210', 'Hasina', '2024-05-24'),
(20, 3, 1, 'ANDRIANTSIFERANA', '1997-12-07', 'Ampefiloha', 'andriantsiferana@gmail.com', '0345547843', 'Ny Aina', '2024-03-10'),
(21, 1, 2, 'RANOROMALALA', '2002-07-25', 'Antanimena', 'ranoromalala@gmail.com', '0347843210', 'Tiana', '2024-04-25'),
(22, 2, 1, 'RAKOTONIRINA', '2001-03-11', 'Besarety', 'rakotonirina@gmail.com', '0348987542', 'Fano', '2024-03-11'),
(23, 3, 2, 'RAZAFINDRALAMBO', '1999-09-21', 'Tsimbazaza', 'razafindralambo@gmail.com', '0343219874', 'Liana', '2024-07-04'),
(24, 4, 1, 'ANDRIAMAMPIANINA', '2000-06-15', 'Ambatonakanga', 'andriamampianina@gmail.com', '0346584712', 'Tovo', '2024-06-10'),
(25, 1, 2, 'RAHARIJAONA', '1998-10-30', 'Tanjombato', 'rahari@jaona.com', '0342569514', 'Maly', '2024-01-12'),
(26, 2, 1, 'RATOVOARIMANANA', '1996-03-17', 'Andohatapenaka', 'ratov@manana.com', '0347581468', 'Mika', '2024-02-03'),
(27, 3, 2, 'RAKOTOMALALANANA', '1995-05-29', 'Mahajanga', 'rakotomalala@gmail.com', '0348943215', 'Arina', '2024-04-15'),
(28, 4, 1, 'RAZAFISY', '2000-12-15', 'Fokontany', 'razafisy@gmail.com', '0346745321', 'Fafah', '2024-05-21'),
(29, 1, 2, 'ANDRIAMENJAKO', '1999-08-10', 'Anjozorobe', 'andriam@menjako.com', '0341234678', 'Mamy', '2024-06-09'),
(30, 2, 1, 'RAKOTONDRAVELO', '1997-11-23', 'Mananjary', 'rakotondrave@gmail.com', '0348765432', 'Vola', '2024-03-01'),
(31, 3, 2, 'RANDRIANARIVELO', '1998-04-08', 'Miarinarivo', 'randrianarivel@gmail.com', '0342211333', 'Koto', '2024-02-14'),
(32, 4, 1, 'RAKOTONDRAMALALA', '2001-07-18', 'Isoraka', 'rakoton@malala.com', '0343334455', 'Tojo', '2024-01-18'),
(33, 1, 2, 'RANAVOLO', '2003-09-25', 'Vatomandry', 'ranavolo@gmail.com', '0345543221', 'Rija', '2024-06-05'),
(34, 2, 1, 'RAHIMANDRANOFINAHITRA', '2000-01-30', 'Vohimena', 'rahiman@nofinahit.com', '0347689012', 'Anja', '2024-03-13'),
(35, 3, 2, 'ANDRIANTSARA', '1999-05-14', 'Soavinandriana', 'andriants@ara.com', '0349856742', 'Tiana', '2024-07-25'),
(36, 4, 1, 'RAKOTONIRINA', '1996-12-04', 'Sakaraha', 'rakoton@irinina.com', '0347539871', 'Neny', '2024-01-12'),
(37, 1, 2, 'RAZAFINDRAKOTON' ,'1998-06-30', 'Isotry', 'razafindrakoton@gmail.com', '0342131654', 'Dalo', '2024-04-20'),
(38, 2, 1, 'ANDRIAMANDRATRA', '2004-02-05', 'Faravohitra', 'andriamandr@atra.com', '0345467893', 'Raf', '2024-05-17'),
(39, 3, 2, 'RAKOTONIRININA', '1997-09-11', 'Ankadinondry', 'rakot@irinina.com', '0348675554', 'Fanja', '2024-02-25'),
(40, 4, 1, 'RAHARIMALALA', '1999-01-29', 'Andohatapenaka', 'raharimalala@gmail.com', '0344352111', 'Kimi', '2024-03-10'),
(41, 1, 2, 'RAHARIJANAHARY', '1996-05-19', 'Antananarivo', 'raharyjanahary@gmail.com', '0349981765', 'Chino', '2024-02-22'),
(42, 2, 1, 'RAKOTONDRATRA', '1998-10-25', 'Tsihombe', 'rakotondratra@gmail.com', '0347835421', 'Mina', '2024-01-19'),
(43, 3, 2, 'RANDRIAMALALA', '2001-03-07', 'Ambalavao', 'randriamalala@gmail.com', '0342254789', 'Salama', '2024-04-10'),
(44, 4, 1, 'RAHARIJOANAHARY', '1999-08-15', 'Fianarantsoa', 'rahari@joanahary.com', '0348741256', 'Rotsy', '2024-03-05'),
(45, 1, 2, 'RAKOTONIRINA', '2003-11-10', 'Tananarive', 'rakotonirina@gmail.com', '0348956463', 'Ila', '2024-06-21'),
(46, 2, 1, 'ANDRIANANAHARY', '1996-02-18', 'Antsirabe', 'andriananahary@gmail.com', '0347941556', 'Soa', '2024-02-19'),
(47, 3, 2, 'RAZAFINDRANALINA', '1998-07-12', 'Sofia', 'razafindranalina@gmail.com', '0349512243', 'Mita', '2024-04-14'),
(48, 4, 1, 'RAHARDJON', '2002-10-30', 'Andravola', 'rahardjon@gmail.com', '0347812345', 'Maholy', '2024-05-30'),
(49, 1, 2, 'RAKOTONDRANOVAL', '1999-09-20', 'Tsaramandroso', 'rakotondranoval@gmail.com', '0341234567', 'Jan', '2024-03-07'),
(50, 2, 1, 'RAHARIMALALA', '2003-11-25', 'Tsimahafotsy', 'raharimalala@gmail.com', '0348906784', 'Zozo', '2024-02-02'),
(51, 3, 2, 'RAHARIANALINA', '2000-06-19', 'Ikongo', 'rahari@analina.com', '0344678812', 'Ily', '2024-03-22'),
(52, 4, 1, 'RAKOTONDRAMALALANARIVELO', '1996-01-02', 'Lava', 'rakoton@malalanarive.com', '0341321345', 'Lambo', '2024-01-03'),
(53, 1, 2, 'RAHARIJAONA', '2003-03-25', 'Maroloko', 'rahari@jaona.com', '0344562358', 'Vivo', '2024-05-15'),
(54, 2, 1, 'RAKOTOMBEHANA', '2002-04-30', 'Ankazomanga', 'rakotombehana@gmail.com', '0347864512', 'Tanona', '2024-04-26'),
(55, 3, 2, 'RAHARIMANANA', '1995-10-06', 'Tanala', 'raharimanana@gmail.com', '0345876543', 'Roda', '2024-01-27'),
(56, 4, 1, 'RAHARIJANAHARY', '1997-07-16', 'Ampitatafika', 'rahari@janahary.com', '0342134569', 'Fana', '2024-05-20'),
(57, 1, 2, 'RAKOTOMIANDRATRA', '2003-05-15', 'Lazao', 'rakotomiandratr@gmail.com', '0348745632', 'Nina', '2024-06-03'),
(58, 2, 1, 'RAHARY', '2001-02-21', 'Ampitatafika', 'rahary@gmail.com', '0346987541', 'Tiana', '2024-03-08'),
(59, 3, 2, 'RAKOTONDRAINA', '1998-11-12', 'Ambatolampy', 'rakotondraina@gmail.com', '0342578923', 'Fitiavana', '2024-06-15'),
(60, 4, 1, 'RAHARIMALALA', '2000-03-19', 'Fokontany', 'raharimalala@gmail.com', '0344651239', 'Nila', '2024-02-06'),
(61, 1, 2, 'RAZAFIMANAHY', '1997-01-13', 'Ankorondrano', 'razafimanahy@gmail.com', '0341357896', 'Sitraka', '2024-04-16'),
(62, 2, 1, 'RAHARY', '2004-08-10', 'Tanjombato', 'rahary@gmail.com', '0347892543', 'Lena', '2024-01-29'),
(63, 3, 2, 'RAKOTONIRINA', '1996-03-11', 'Ambatomanga', 'rakotonirina@gmail.com', '0345678421', 'Roro', '2024-02-22'),
(64, 4, 1, 'ANDRIAMBOLO', '1998-09-23', 'Ankato', 'andriambolo@gmail.com', '0348765342', 'Vina', '2024-04-17'),
(65, 1, 2, 'RAZAFINDRAKOTO', '2003-11-30', 'Antananarivo', 'razafindrakoto@gmail.com', '0345234812', 'Tina', '2024-05-01'),
(66, 2, 1, 'RAHARIMANANA', '2000-07-25', 'Antananarivo', 'raharimanana@gmail.com', '0347635123', 'Jao', '2024-03-05'),
(67, 3, 2, 'RAKOTONDRAINA', '1998-12-15', 'Ankorondrano', 'rakotondraina@gmail.com', '0347896532', 'Sopala', '2024-04-21'),
(68, 4, 1, 'RAHARY', '2001-10-20', 'Ambanidia', 'rahary@gmail.com', '0348889745', 'Lea', '2024-01-10'),
(69, 1, 2, 'RAKOTOMAHERY', '1997-05-30', 'Andranomanelatra', 'rakotomahery@gmail.com', '0347625138', 'Kanto', '2024-02-10'),
(70, 2, 1, 'RAZAFINDRAKOTON', '1995-01-23', 'Sofia', 'razafindrakoton@gmail.com', '0345621879', 'Kanto', '2024-03-15'),
(71, 3, 2, 'ANDRIANARIVELO', '2003-08-10', 'Tsaramandroso', 'andrianarivelo@gmail.com', '0348456123', 'Rina', '2024-05-10'),
(72, 4, 1, 'RAHARIMANANA', '2000-09-30', 'Sofia', 'raharimanana@gmail.com', '0347894532', 'Kanto', '2024-04-28'),
(73, 1, 2, 'RAZAFIMANAHY', '1999-12-02', 'Ambatomanga', 'razafimanahy@gmail.com', '0345675432', 'Rina', '2024-06-08'),
(74, 2, 1, 'RAKOTONDRATRA', '1998-03-25', 'Andranomanelatra', 'rakotondratra@gmail.com', '0348901234', 'Mila', '2024-05-18'),
(75, 3, 2, 'RAHARIMALALA', '1997-11-07', 'Ampitatafika', 'raharimalala@gmail.com', '0346123456', 'Mino', '2024-02-12'),
(76, 4, 1, 'RAKOTONDRAINA', '2003-05-18', 'Ankato', 'rakotondraina@gmail.com', '0349851234', 'Lea', '2024-06-30'),
(77, 1, 2, 'ANDRIANARIVELO', '2000-11-18', 'Anosibe', 'andrianarivelo@gmail.com', '0345612345', 'Kanto', '2024-01-15'),
(78, 2, 1, 'RAHARIMALALA', '1996-10-30', 'Fokontany', 'raharimalala@gmail.com', '0349823456', 'Mino', '2024-04-12'),
(79, 3, 2, 'RAKOTONIRINA', '2003-07-22', 'Isotry', 'rakotonirina@gmail.com', '0345641234', 'Tiana', '2024-03-19'),
(80, 4, 1, 'RAHARIMANANA', '1998-05-05', 'Sofia', 'raharimanana@gmail.com', '0346712345', 'Zozo', '2024-02-20'),
(81, 1, 2, 'RAKOTOMBEHANA', '2002-08-15', 'Antananarivo', 'rakotombehana@gmail.com', '0347654567', 'Sitraka', '2024-06-25'),
(82, 2, 1, 'RAHARIMANANA', '2000-04-12', 'Ampitatafika', 'raharimanana@gmail.com', '0347623456', 'Ranaivo', '2024-05-09'),
(83, 3, 2, 'RAKOTONDRAINA', '1996-09-14', 'Tsihombe', 'rakotondraina@gmail.com', '0346574832', 'Nina', '2024-01-31'),
(84, 4, 1, 'RAHARIMALALA', '2002-06-24', 'Lazao', 'raharimalala@gmail.com', '0348732456', 'Mira', '2024-06-04'),
(85, 1, 2, 'RAZAFINDRAKOTON', '1999-11-03', 'Ankorondrano', 'razafindrakoton@gmail.com', '0348974567', 'Hery', '2024-04-03'),
(86, 2, 1, 'RAKOTONIRINA', '2001-12-20', 'Andranomanelatra', 'rakotonirina@gmail.com', '0345678123', 'Raja', '2024-05-13'),
(87, 3, 2, 'RAHARIMALALA', '1998-04-18', 'Antananarivo', 'raharimalala@gmail.com', '0346789123', 'Fitiavana', '2024-03-30'),
(88, 4, 1, 'RAZAFINDRAKOTO', '2004-07-28', 'Tananarive', 'razafindrakoto@gmail.com', '0347564321', 'Rina', '2024-05-05'),
(89, 1, 2, 'RAHARIMANANA', '1995-03-29', 'Fianarantsoa', 'raharimanana@gmail.com', '0346127890', 'Tiana', '2024-01-05'),
(90, 2, 1, 'RAKOTOMALALANARIVELO', '2002-02-20', 'Ambalavao', 'rakotomalalanarivel@gmail.com', '0349876543', 'Fanja', '2024-03-15'),
(91, 3, 2, 'RAHARIMANANA', '2003-12-14', 'Ikongo', 'raharimanana@gmail.com', '0348765432', 'Lia', '2024-02-17'),
(92, 4, 1, 'RAKOTONIRINA', '2001-09-30', 'Lava', 'rakotonirina@gmail.com', '0342345678', 'Sitraka', '2024-05-18'),
(93, 1, 2, 'RAHARIMALALA', '1996-11-14', 'Tsihombe', 'raharimalala@gmail.com', '0347654312', 'Zaza', '2024-04-26'),
(94, 2, 1, 'RAKOTONIRINA', '2002-01-09', 'Anosibe', 'rakotonirina@gmail.com', '0341234567', 'Hery', '2024-02-19'),
(95, 3, 2, 'RAHARIMANANA', '2000-08-23', 'Tsihombe', 'raharimanana@gmail.com', '0344567890', 'Lia', '2024-06-30'),
(96, 4, 1, 'RAKOTONIRINA', '1997-02-01', 'Fianarantsoa', 'rakotonirina@gmail.com', '0345678901', 'Tiana', '2024-03-20'),
(97, 1, 2, 'RAHARIMALALA', '2003-10-05', 'Tsaramandroso', 'raharimalala@gmail.com', '0346543210', 'Rena', '2024-05-24'),
(98, 2, 1, 'RAZAFINDRAKOTON', '1999-04-15', 'Ankato', 'razafindrakoton@gmail.com', '0341234567', 'Hery', '2024-06-12'),
(99, 3, 2, 'RAHARIMANANA', '2001-06-22', 'Tsihombe', 'raharimanana@gmail.com', '0349876543', 'Zozo', '2024-05-05'),
(100, 4, 1, 'RAKOTONIRINA', '1996-07-15', 'Antananarivo', 'rakotonirina@gmail.com', '0347654321', 'Rena', '2024-01-25');
