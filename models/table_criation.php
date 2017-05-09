<?php
/**
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 18/04/2017
 * Time: 16:11
 */

require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

function eea_uninstall_db() {

    $host = DB_HOST;
    $dataBase = DB_NAME;

    try {
        $sql = '
            DROP TABLE IF EXISTS `eea_campus`;
            DROP TABLE IF EXISTS `eea_discipline`;
            DROP TABLE IF EXISTS `eea_functions`;
            DROP TABLE IF EXISTS `eea_others_features`;
            DROP TABLE IF EXISTS `eea_host_institutions`;
            DROP TABLE IF EXISTS `eea_financial_resources`;
            DROP TABLE IF EXISTS `eea_institution`;
            DROP TABLE IF EXISTS `eea_members`;
            DROP TABLE IF EXISTS `eea_participation`;
            DROP TABLE IF EXISTS `eea_coordinator`;
        ';

        $dbh = new PDO("mysql:dbname=$dataBase;host=$host", DB_USER, DB_PASSWORD, array(PDO::ATTR_PERSISTENT => true));

        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $dbh->beginTransaction();
        $dbh->exec($sql);
        $dbh->commit();

    } catch (Exception $e) {
        $dbh->rollBack();
        echo "error database\n";
        die("Unable to connect: " . $e->getMessage());
    }
}

function eea_db_install(){
    $host = DB_HOST;
    $dataBase = DB_NAME;

    try {
        $sql = '
            -- --------------------------------------------------------
            --
            -- Estrutura da tabela `eea_coordinator`
            --
            
            CREATE TABLE IF NOT EXISTS `eea_coordinator` (
              `id_coordenador` int(11) NOT NULL AUTO_INCREMENT,
              `name` varchar(255) DEFAULT NULL,
              `cpf` varchar(255) DEFAULT NULL,
              `address` varchar(255) DEFAULT NULL,
              `email` varchar(255) DEFAULT NULL,
              `phone` varchar(255) DEFAULT NULL,
              `mobile` varchar(255) DEFAULT NULL,
              `responsible` varchar(255) DEFAULT NULL,
              `lattes` varchar(255) DEFAULT NULL,
              `experience` varchar(3100) DEFAULT NULL,
              `external_participation` varchar(1600) DEFAULT NULL,
              `motivation` varchar(2100) DEFAULT NULL,
              `registration_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              PRIMARY KEY (`id_coordenador`)
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    
            -- --------------------------------------------------------
            --
            -- Estrutura da tabela `eea_campus`
            --
    
            CREATE TABLE IF NOT EXISTS `eea_campus` (
              `id_campus` int(11) NOT NULL AUTO_INCREMENT,
              `name` varchar(255) DEFAULT NULL,
              `cnpj` varchar(255) DEFAULT NULL,
              `address` varchar(255) DEFAULT NULL,
              `email` varchar(255) DEFAULT NULL,
              `phone` varchar(255) DEFAULT NULL,
              `responsible` varchar(255) DEFAULT NULL,
              `phone_responsible` varchar(255) DEFAULT NULL,
              `id_institution` int(11) DEFAULT NULL,
              PRIMARY KEY (`id_campus`),
              KEY `id_institution` (`id_institution`)
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    
            -- --------------------------------------------------------
            --
            -- Estrutura da tabela `eea_discipline`
            --
            
            CREATE TABLE IF NOT EXISTS `eea_discipline` (
              `id_discipline` int(11) NOT NULL AUTO_INCREMENT,
              `name` varchar(255) DEFAULT NULL,
              `optional` varchar(255) DEFAULT NULL,
              `code_discipline` varchar(255) DEFAULT NULL,
              `teacher` varchar(255) DEFAULT NULL,
              `n_students` int(11) DEFAULT NULL,
              `id_institution` int(11) DEFAULT NULL,
              PRIMARY KEY (`id_discipline`),
              KEY `id_institution` (`id_institution`)
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    
            -- --------------------------------------------------------
            --
            -- Estrutura da tabela `eea_financial_resources`
            --
            
            CREATE TABLE IF NOT EXISTS `eea_financial_resources` (
              `id_financial_resources` int(11) NOT NULL AUTO_INCREMENT,
              `name` varchar(255) DEFAULT NULL,
              `cnpj` varchar(255) DEFAULT NULL,
              `address` varchar(255) DEFAULT NULL,
              `own_resource` varchar(255) DEFAULT NULL,
              `partner_features` varchar(255) DEFAULT NULL,
              `contact_person` varchar(1600) DEFAULT NULL,
              `detailing` varchar(1600) DEFAULT NULL,
              `id_participation` int(11) DEFAULT NULL,
              PRIMARY KEY (`id_financial_resources`),
              KEY `id_participation3` (`id_participation`)
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    
            -- --------------------------------------------------------
            --
            -- Estrutura da tabela `eea_functions`
            --
            
            CREATE TABLE IF NOT EXISTS `eea_functions` (
              `id_functions` int(11) NOT NULL AUTO_INCREMENT,
              `function` varchar(255) DEFAULT NULL,
              `id_member` int(255) DEFAULT NULL,
              PRIMARY KEY (`id_functions`),
              KEY `id_member` (`id_member`)
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    
            -- --------------------------------------------------------
            --
            -- Estrutura da tabela `eea_host_institutions`
            --
            
            CREATE TABLE IF NOT EXISTS `eea_host_institutions` (
              `id_host_institutions` int(11) NOT NULL AUTO_INCREMENT,
              `name` varchar(255) DEFAULT NULL,
              `address` varchar(255) DEFAULT NULL,
              `maximum_capacity` varchar(255) DEFAULT NULL,
              `optional_features` varchar(2100) DEFAULT NULL,
              `identification` varchar(2100) DEFAULT NULL,
              `id_participation` int(11) DEFAULT NULL,
              PRIMARY KEY (`id_host_institutions`),
              KEY `id_participation` (`id_participation`)
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    
            -- --------------------------------------------------------
            --
            -- Estrutura da tabela `eea_institution`
            --
            
            CREATE TABLE IF NOT EXISTS `eea_institution` (
              `id_institution` int(11) NOT NULL AUTO_INCREMENT,
              `name` varchar(255) DEFAULT NULL,
              `cnpj` varchar(255) DEFAULT NULL,
              `address` varchar(255) DEFAULT NULL,
              `email` varchar(255) DEFAULT NULL,
              `phone` varchar(255) DEFAULT NULL,
              `responsible` varchar(255) DEFAULT NULL,
              `phone_responsible` varchar(255) DEFAULT NULL,
              `past_participations` varchar(4100) DEFAULT NULL,
              `term_appointment` varchar(4100) DEFAULT NULL,
              `proposal` varchar(4100) DEFAULT NULL,
              `partnerships_historic` varchar(4100) DEFAULT NULL,
              `partnerships_between_institutions` varchar(4100) DEFAULT NULL,
              `partnerships_between_campus` varchar(4100) DEFAULT NULL,
              `partnerships_for_pea` varchar(4100) DEFAULT NULL,
              `id_coordinator` int(11) DEFAULT NULL,
              PRIMARY KEY (`id_institution`),
              KEY `id_coordinator` (`id_coordinator`)
            ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=74 ;
    
            -- --------------------------------------------------------
            --
            -- Estrutura da tabela `eea_members`
            --
            
            CREATE TABLE IF NOT EXISTS `eea_members` (
              `id_member` int(255) NOT NULL AUTO_INCREMENT,
              `name` varchar(255) DEFAULT NULL,
              `lattes` varchar(255) DEFAULT NULL,
              `cpf` varchar(255) DEFAULT NULL,
              `email` varchar(255) DEFAULT NULL,
              `mobile` varchar(255) DEFAULT NULL,
              `functions` varchar(255) DEFAULT NULL,
              `id_coordenador` int(255) DEFAULT NULL,
              PRIMARY KEY (`id_member`),
              KEY `id_coordenador` (`id_coordenador`)
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    
            -- --------------------------------------------------------
            --
            -- Estrutura da tabela `eea_others_features`
            --
            
            CREATE TABLE IF NOT EXISTS `eea_others_features` (
              `id_eea_others_features` int(11) NOT NULL AUTO_INCREMENT,
              `name` varchar(3000) DEFAULT NULL,
              `id_host_institutions` int(11) DEFAULT NULL,
              PRIMARY KEY (`id_eea_others_features`),
              KEY `id_host_institutions` (`id_host_institutions`)
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    
            -- --------------------------------------------------------
            --
            -- Estrutura da tabela `eea_participation`
            --
            
            CREATE TABLE IF NOT EXISTS `eea_participation` (
              `id_participation` int(11) NOT NULL AUTO_INCREMENT,
              `dissemination_plan` varchar(4100) DEFAULT NULL,
              `id_coordenador` int(11) DEFAULT NULL,
              PRIMARY KEY (`id_participation`),
              KEY `id_coordenador2` (`id_coordenador`)
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    
            --
            -- Limitadores para a tabela `eea_discipline`
            --
            ALTER TABLE `eea_discipline`
              ADD CONSTRAINT `id_institution` FOREIGN KEY (`id_institution`) REFERENCES `eea_institution` (`id_institution`) ON DELETE CASCADE ON UPDATE CASCADE;
    
            --
            -- Limitadores para a tabela `eea_financial_resources`
            --
            ALTER TABLE `eea_financial_resources`
              ADD CONSTRAINT `id_participation3` FOREIGN KEY (`id_participation`) REFERENCES `eea_participation` (`id_participation`) ON DELETE CASCADE ON UPDATE CASCADE;
    
            --
            -- Limitadores para a tabela `eea_functions`
            --
            ALTER TABLE `eea_functions`
              ADD CONSTRAINT `id_member` FOREIGN KEY (`id_member`) REFERENCES `eea_members` (`id_member`) ON DELETE CASCADE ON UPDATE CASCADE;
    
            --
            -- Limitadores para a tabela `eea_host_institutions`
            --
            ALTER TABLE `eea_host_institutions`
              ADD CONSTRAINT `id_participation` FOREIGN KEY (`id_participation`) REFERENCES `eea_participation` (`id_participation`) ON DELETE CASCADE ON UPDATE CASCADE;
    
            --
            -- Limitadores para a tabela `eea_members`
            --
            ALTER TABLE `eea_members`
              ADD CONSTRAINT `id_coordenador` FOREIGN KEY (`id_coordenador`) REFERENCES `eea_coordinator` (`id_coordenador`) ON DELETE CASCADE ON UPDATE CASCADE;
    
            --
            -- Limitadores para a tabela `eea_others_features`
            --
            ALTER TABLE `eea_others_features`
              ADD CONSTRAINT `id_host_institutions` FOREIGN KEY (`id_host_institutions`) REFERENCES `eea_host_institutions` (`id_host_institutions`) ON DELETE CASCADE ON UPDATE CASCADE;
    
            --
            -- Limitadores para a tabela `eea_participation`
            --
            ALTER TABLE `eea_participation`
              ADD CONSTRAINT `id_coordenador2` FOREIGN KEY (`id_coordenador`) REFERENCES `eea_coordinator` (`id_coordenador`) ON DELETE CASCADE ON UPDATE CASCADE;
    
            --
            -- Limitadores para a tabela `eea_institution`
            --
            ALTER TABLE `eea_institution`
              ADD CONSTRAINT `id_coordinator` FOREIGN KEY (`id_coordinator`) REFERENCES `eea_coordinator` (`id_coordenador`) ON DELETE CASCADE ON UPDATE CASCADE;
        ';
        $dbh = new PDO("mysql:dbname=$dataBase;host=$host", DB_USER, DB_PASSWORD, array(PDO::ATTR_PERSISTENT => true));

        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $dbh->beginTransaction();
        $dbh->exec($sql);
        $dbh->commit();

    } catch (Exception $e) {
        $dbh->rollBack();
        echo "error database\n";
        die("Não foi possível criar as tabelas: " . $e->getMessage());
    }
}