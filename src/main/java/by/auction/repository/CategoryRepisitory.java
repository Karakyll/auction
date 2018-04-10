package by.auction.repository;

import by.auction.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepisitory extends JpaRepository<Auction, Long>{



}
