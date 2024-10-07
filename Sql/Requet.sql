
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